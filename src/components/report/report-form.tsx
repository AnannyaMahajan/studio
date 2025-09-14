'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reportFormSchema, type ReportFormValues } from '@/lib/schemas';
import type { RiskScoreAndExplainabilityOutput } from '@/ai/flows/generate-risk-score-and-explainability';
import { getRiskScore } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LocateFixed } from 'lucide-react';
import { RiskScoreDisplay } from './risk-score-display';

const symptoms = [
  { id: 'diarrhea', label: 'Diarrhea' },
  { id: 'vomiting', label: 'Vomiting' },
  { id: 'fever', label: 'Fever' },
  { id: 'stomach_cramps', label: 'Stomach Cramps' },
  { id: 'dehydration', label: 'Dehydration' },
  { id: 'skin_rash', label: 'Skin Rash' },
];

export function ReportForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<RiskScoreAndExplainabilityOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      symptomChecklist: [],
      caseCounts: 0,
      photoUpload: '',
      waterSampleDetails: '',
      gpsCoordinates: '',
      turbidity: 0,
      pH: 7,
      bacterialIndicators: '',
      conductivity: 0,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = form;

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue('gpsCoordinates', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, { shouldValidate: true });
          toast({
            title: 'Location Captured',
            description: 'GPS coordinates have been successfully updated.',
          });
        },
        (error) => {
          console.error('Error getting location:', error.message);
          toast({
            title: 'Error getting location',
            description: 'Please ensure location services are enabled.',
            variant: 'destructive',
          });
        }
      );
    } else {
      toast({
        title: 'Geolocation not supported',
        description: 'Your browser does not support geolocation.',
        variant: 'destructive',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('photoUpload', reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ReportFormValues) => {
    setIsLoading(true);
    setAnalysisResult(null);

    const inputData = {
        ...data,
        // Ensure photoUpload is a string, even if empty. The flow requires it.
        photoUpload: data.photoUpload || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    };

    try {
      const result = await getRiskScore(inputData);
      if (result) {
        setAnalysisResult(result);
        toast({
          title: 'Analysis Complete',
          description: 'Risk score and action plan generated successfully.',
        });
      }
    } catch (error) {
      toast({
        title: 'Analysis Failed',
        description: 'An error occurred while analyzing the report. Please try again.',
        variant: 'destructive',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!analysisResult ? (
        <Card>
          <CardHeader>
            <CardTitle>Submit Health Report</CardTitle>
            <CardDescription>
              Fill in the details below to the best of your ability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <Label>1. Observed Symptoms</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-lg border p-4">
                  {symptoms.map((symptom) => (
                    <div key={symptom.id} className="flex items-center gap-2">
                       <Controller
                        name="symptomChecklist"
                        control={control}
                        render={({ field }) => (
                           <Checkbox
                            id={symptom.id}
                            checked={field.value?.includes(symptom.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), symptom.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== symptom.id
                                    )
                                  );
                            }}
                          />
                        )}
                      />
                      <Label htmlFor={symptom.id} className="font-normal">{symptom.label}</Label>
                    </div>
                  ))}
                </div>
                 {errors.symptomChecklist && <p className="text-sm text-destructive">{errors.symptomChecklist.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseCounts">2. Number of Cases</Label>
                <Input id="caseCounts" type="number" {...register('caseCounts', { valueAsNumber: true, onChange: (e) => e.target.value = e.target.value || 0 })} placeholder="e.g., 5" />
                 {errors.caseCounts && <p className="text-sm text-destructive">{errors.caseCounts.message}</p>}
              </div>

               <div className="space-y-2">
                <Label htmlFor="gpsCoordinates">3. GPS Coordinates</Label>
                <div className="flex gap-2">
                    <Input id="gpsCoordinates" {...register('gpsCoordinates')} placeholder="e.g., 22.5726, 88.3639" />
                    <Button type="button" variant="outline" onClick={handleGetLocation}><LocateFixed/></Button>
                </div>
                 {errors.gpsCoordinates && <p className="text-sm text-destructive">{errors.gpsCoordinates.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterSampleDetails">4. Water Sample Details</Label>
                <Textarea id="waterSampleDetails" {...register('waterSampleDetails')} placeholder="Describe the water source, color, smell, etc." />
                {errors.waterSampleDetails && <p className="text-sm text-destructive">{errors.waterSampleDetails.message}</p>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="turbidity">5. Turbidity (NTU)</Label>
                    <Input id="turbidity" type="number" {...register('turbidity', { valueAsNumber: true, onChange: (e) => e.target.value = e.target.value || 0 })} placeholder="e.g., 45" />
                    {errors.turbidity && <p className="text-sm text-destructive">{errors.turbidity.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="pH">6. pH Level</Label>
                    <Input id="pH" type="number" step="0.1" {...register('pH', { valueAsNumber: true, onChange: (e) => e.target.value = e.target.value || 0 })} placeholder="e.g., 6.8" />
                    {errors.pH && <p className="text-sm text-destructive">{errors.pH.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="bacterialIndicators">7. Bacterial Indicators</Label>
                    <Input id="bacterialIndicators" {...register('bacterialIndicators')} placeholder="e.g., E. coli detected" />
                    {errors.bacterialIndicators && <p className="text-sm text-destructive">{errors.bacterialIndicators.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="conductivity">8. Conductivity (µS/cm)</Label>
                    <Input id="conductivity" type="number" {...register('conductivity', { valueAsNumber: true, onChange: (e) => e.target.value = e.target.value || 0 })} placeholder="e.g., 550" />
                    {errors.conductivity && <p className="text-sm text-destructive">{errors.conductivity.message}</p>}
                </div>
              </div>

               <div className="space-y-2">
                    <Label htmlFor="photoUpload">9. Upload Photo (Optional)</Label>
                    <Input id="photoUpload" type="file" accept="image/*" onChange={handleFileChange} />
                </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Analyzing...' : 'Generate Risk Score'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <RiskScoreDisplay result={analysisResult} />
      )}
    </>
  );
}
