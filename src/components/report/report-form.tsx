
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
import { useTranslation } from '@/hooks/use-translation';

const symptoms = [
  { id: 'diarrhea', labelKey: 'report.form.symptoms.diarrhea' },
  { id: 'vomiting', labelKey: 'report.form.symptoms.vomiting' },
  { id: 'fever', labelKey: 'report.form.symptoms.fever' },
  { id: 'stomach_cramps', labelKey: 'report.form.symptoms.stomach_cramps' },
  { id: 'dehydration', labelKey: 'report.form.symptoms.dehydration' },
  { id: 'skin_rash', labelKey: 'report.form.symptoms.skin_rash' },
];

export function ReportForm() {
  const { t } = useTranslation();
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
            title: t('report.toast.locationSuccessTitle'),
            description: t('report.toast.locationSuccessDescription'),
          });
        },
        (error) => {
          console.error('Error getting location:', error.message);
          toast({
            title: t('report.toast.locationErrorTitle'),
            description: t('report.toast.locationErrorDescription'),
            variant: 'destructive',
          });
        }
      );
    } else {
      toast({
        title: t('report.toast.locationNotSupportedTitle'),
        description: t('report.toast.locationNotSupportedDescription'),
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
        photoUpload: data.photoUpload || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    };

    try {
      const result = await getRiskScore(inputData);
      if (result) {
        setAnalysisResult(result);
        toast({
          title: t('report.toast.analysisSuccessTitle'),
          description: t('report.toast.analysisSuccessDescription'),
        });
      }
    } catch (error) {
      toast({
        title: t('report.toast.analysisErrorTitle'),
        description: t('report.toast.analysisErrorDescription'),
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
            <CardTitle>{t('report.form.title')}</CardTitle>
            <CardDescription>
              {t('report.form.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <Label>{t('report.form.symptomsLabel')}</Label>
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
                      <Label htmlFor={symptom.id} className="font-normal">{t(symptom.labelKey)}</Label>
                    </div>
                  ))}
                </div>
                 {errors.symptomChecklist && <p className="text-sm text-destructive">{errors.symptomChecklist.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseCounts">{t('report.form.caseCountsLabel')}</Label>
                <Input id="caseCounts" type="number" {...register('caseCounts', { valueAsNumber: true })} placeholder={t('report.form.caseCountsPlaceholder')} />
                 {errors.caseCounts && <p className="text-sm text-destructive">{errors.caseCounts.message}</p>}
              </div>

               <div className="space-y-2">
                <Label htmlFor="gpsCoordinates">{t('report.form.gpsLabel')}</Label>
                <div className="flex gap-2">
                    <Input id="gpsCoordinates" {...register('gpsCoordinates')} placeholder={t('report.form.gpsPlaceholder')} />
                    <Button type="button" variant="outline" onClick={handleGetLocation}><LocateFixed/></Button>
                </div>
                 {errors.gpsCoordinates && <p className="text-sm text-destructive">{errors.gpsCoordinates.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterSampleDetails">{t('report.form.waterDetailsLabel')}</Label>
                <Textarea id="waterSampleDetails" {...register('waterSampleDetails')} placeholder={t('report.form.waterDetailsPlaceholder')} />
                {errors.waterSampleDetails && <p className="text-sm text-destructive">{errors.waterSampleDetails.message}</p>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="turbidity">{t('report.form.turbidityLabel')}</Label>
                    <Input id="turbidity" type="number" {...register('turbidity', { valueAsNumber: true })} placeholder={t('report.form.turbidityPlaceholder')} />
                    {errors.turbidity && <p className="text-sm text-destructive">{errors.turbidity.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="pH">{t('report.form.phLabel')}</Label>
                    <Input id="pH" type="number" step="0.1" {...register('pH', { valueAsNumber: true })} placeholder={t('report.form.phPlaceholder')} />
                    {errors.pH && <p className="text-sm text-destructive">{errors.pH.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="bacterialIndicators">{t('report.form.bacteriaLabel')}</Label>
                    <Input id="bacterialIndicators" {...register('bacterialIndicators')} placeholder={t('report.form.bacteriaPlaceholder')} />
                    {errors.bacterialIndicators && <p className="text-sm text-destructive">{errors.bacterialIndicators.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="conductivity">{t('report.form.conductivityLabel')}</Label>
                    <Input id="conductivity" type="number" {...register('conductivity', { valueAsNumber: true })} placeholder={t('report.form.conductivityPlaceholder')} />
                    {errors.conductivity && <p className="text-sm text-destructive">{errors.conductivity.message}</p>}
                </div>
              </div>

               <div className="space-y-2">
                    <Label htmlFor="photoUpload">{t('report.form.photoLabel')}</Label>
                    <Input id="photoUpload" type="file" accept="image/*" onChange={handleFileChange} />
                </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? t('report.form.analyzingButton') : t('report.form.submitButton')}
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
