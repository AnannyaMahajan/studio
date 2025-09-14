export type Alert = {
  id: number;
  title: string;
  description: string;
  level: 'high' | 'medium' | 'low';
  time: string;
};
