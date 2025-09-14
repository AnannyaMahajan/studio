import { z } from 'zod';

export const reportFormSchema = z.object({
  symptomChecklist: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one symptom.',
    }),
  caseCounts: z.number().min(0, { message: 'Case count must be non-negative.' }),
  photoUpload: z.string().optional(),
  waterSampleDetails: z.string().min(10, { message: 'Please provide at least a brief description.' }),
  gpsCoordinates: z.string().regex(/^-?(\d{1,3}(\.\d+)?),\s*-?(\d{1,3}(\.\d+)?)$/, { message: "Invalid GPS coordinates format."}),
  turbidity: z.number().min(0, { message: 'Turbidity must be non-negative.' }),
  pH: z.number().min(0).max(14, { message: 'pH must be between 0 and 14.' }),
  bacterialIndicators: z.string().min(1, { message: 'Bacterial indicators are required.' }),
  conductivity: z.number().min(0, { message: 'Conductivity must be non-negative.' }),
});

export type ReportFormValues = z.infer<typeof reportFormSchema>;
