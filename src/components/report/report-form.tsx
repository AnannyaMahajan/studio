'use client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getRiskScore } from '@/lib/actions';
import { reportFormSchema, type ReportFormValues } from '@/lib/schemas';
import type { RiskScoreAndExplainabilityOutput } from '@/ai/flows/generate-risk-score-and-explainability';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Loader2,
  MapPin,
  Upload,
  Droplets,
  Thermometer,
  TestTube2,
  Zap,
  Activity,
  FileQuestion,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RiskScoreDisplay } from './risk-score-display';

const symptoms = [
  { id: 'fever', label: 'Fever' },
  { id: 'cough', label: 'Cough' },
  { id: 'diarrhea', label: 'Diarrhea' },
  { id: 'vomiting', label: 'Vomiting' },
  { id: 'skin_rash', label: 'Skin Rash' },
  { id: 'headache', label: 'Headache' },
];

export function ReportForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [result, setResult] =
    React.useState<RiskScoreAndExplainabilityOutput | null>(null);

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

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          form.setValue('gpsCoordinates', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast({ title: 'Location captured successfully.' });
        },
        (error) => {
          console.error('Error getting location:', error);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
          toast({
              title: "File is too large",
              description: "Please upload a file smaller than 2MB.",
              variant: "destructive",
          });
          event.target.value = ''; // Reset file input
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('photoUpload', reader.result as string);
      };
      reader.onerror = () => {
          toast({
              title: "Failed to read file",
              description: "There was an error processing your photo.",
              variant: "destructive",
          });
      }
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: ReportFormValues) {
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await getRiskScore(values);
      if (response) {
        setResult(response);
        toast({
          title: 'Analysis Complete',
          description: `A risk score of "${response.riskScore}" has been determined.`,
        });
        form.reset();
      } else {
        throw new Error('Received an empty response from the server.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="symptomChecklist"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Symptom Checklist</FormLabel>
                      <FormDescription>
                        Select all symptoms observed in the community.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    {symptoms.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="symptomChecklist"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caseCounts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Counts</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter number of cases" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                  control={form.control}
                  name="photoUpload"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Photo Upload</FormLabel>
                          <FormControl>
                            <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} className="file:text-primary file:font-semibold" />
                          </FormControl>
                          <FormDescription>Upload a relevant photo (e.g., water source, affected area).</FormDescription>
                          <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                control={form.control}
                name="gpsCoordinates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPS Coordinates</FormLabel>
                    <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="e.g., 28.6139, 77.2090" {...field} />
                    </FormControl>
                    <Button type="button" variant="outline" onClick={handleGetLocation}>
                        <MapPin className="mr-2 h-4 w-4"/> Get
                    </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Droplets/>Water Quality</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="waterSampleDetails" render={({ field }) => (
                      <FormItem><FormLabel>Water Sample Details</FormLabel><FormControl><Textarea placeholder="Describe the water source and appearance..." {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="turbidity" render={({ field }) => (
                      <FormItem><FormLabel className="flex items-center gap-1"><Activity/>Turbidity</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="pH" render={({ field }) => (
                      <FormItem><FormLabel className="flex items-center gap-1"><Thermometer/>pH</FormLabel><FormControl><Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  </div>
                  <FormField control={form.control} name="bacterialIndicators" render={({ field }) => (
                      <FormItem><FormLabel className="flex items-center gap-1"><TestTube2/>Bacterial Indicators</FormLabel><FormControl><Input placeholder="e.g., E. coli, Coliform" {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="conductivity" render={({ field }) => (
                      <FormItem><FormLabel className="flex items-center gap-1"><Zap/>Conductivity</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} /></FormControl><FormMessage /></FormItem>
                  )}/>
                </CardContent>
              </Card>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  'Submit and Analyze Risk'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="sticky top-24">
        {isSubmitting && (
            <Card className="flex flex-col items-center justify-center p-8 gap-4 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h2 className="text-xl font-semibold">Generating Risk Analysis</h2>
                <p className="text-muted-foreground">Please wait while the AI model processes the data. This may take a moment.</p>
            </Card>
        )}
        {result && <RiskScoreDisplay result={result} />}
        {!isSubmitting && !result && (
            <Card className="flex flex-col items-center justify-center p-8 gap-4 text-center border-dashed">
                <div className="bg-muted p-4 rounded-full">
                    <FileQuestion className="h-12 w-12 text-muted-foreground"/>
                </div>
                <h2 className="text-xl font-semibold">Awaiting Report Submission</h2>
                <p className="text-muted-foreground">The risk analysis and explainability factors will appear here once you submit the report.</p>
            </Card>
        )}
      </div>
    </div>
  );
}
