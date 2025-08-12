import * as z from 'zod';

export const appointmentSchema = z.object({
  id: z.string(),
  patientName: z.string(),
  date: z.date(),
  time: z.object({
    hours: z.string().min(2).max(2),
    minutes: z.string().min(2).max(2),
  }),
  status: z.enum(['Pending', 'Accepted', 'Rejected', 'Completed']),
  reason: z.string(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;