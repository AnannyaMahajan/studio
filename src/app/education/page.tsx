import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { GraduationCap, BookOpen, Video } from 'lucide-react';

const educationalContent = [
  {
    title: 'Understanding Waterborne Diseases',
    description: 'Learn about common diseases spread through contaminated water.',
    icon: <BookOpen className="size-6 text-primary" />,
    link: '#',
  },
  {
    title: 'Proper Handwashing Techniques',
    description: 'A video guide to effective handwashing.',
    icon: <Video className="size-6 text-primary" />,
    link: '#',
  },
  {
    title: 'Identifying Contaminated Water Sources',
    description: 'Key signs that a water source may be unsafe for consumption.',
    icon: <BookOpen className="size-6 text-primary" />,
    link: '#',
  },
   {
    title: 'Community Hygiene Promotion',
    description: 'Strategies for improving hygiene practices in your community.',
    icon: <BookOpen className="size-6 text-primary" />,
    link: '#',
  },
];

export default function EducationPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header className="flex items-center gap-4">
        <GraduationCap className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Education Resources
          </h1>
          <p className="text-muted-foreground">
            Training materials and health information for CHWs.
          </p>
        </div>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {educationalContent.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-muted p-3 rounded-full">
                    {item.icon}
                </div>
                <div>
                    <CardTitle>{item.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
