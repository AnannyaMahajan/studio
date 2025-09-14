import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { GraduationCap, BookOpen, Video } from 'lucide-react';

const educationalContent = [
  {
    id: 'understanding-diseases',
    title: 'Understanding Waterborne Diseases',
    description: 'Learn about common diseases spread through contaminated water.',
    icon: <BookOpen className="size-6 text-primary" />,
    type: 'article',
    content: (
        <div className="space-y-4 text-sm text-muted-foreground">
            <p>Waterborne diseases are caused by pathogenic microorganisms that most commonly are transmitted in contaminated fresh water. Infection commonly results during bathing, washing, drinking, in the preparation of food, or the consumption of food thus infected.</p>
            <h4 className="font-semibold text-foreground">Common Diseases:</h4>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Cholera:</strong> An acute diarrhoeal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae.</li>
                <li><strong>Typhoid Fever:</strong> A life-threatening illness caused by the bacterium Salmonella Typhi. It is usually spread through contaminated food or water.</li>
                <li><strong>Hepatitis A:</strong> A liver infection caused by the Hepatitis A virus (HAV). It is highly contagious and spreads from person to person and through contaminated food or water.</li>
            </ul>
            <h4 className="font-semibold text-foreground">Prevention:</h4>
             <ul className="list-disc pl-5 space-y-1">
                <li>Always drink safe, treated water.</li>
                <li>Wash hands thoroughly with soap and water.</li>
                <li>Cook food properly.</li>
             </ul>
        </div>
    )
  },
  {
    id: 'handwashing-techniques',
    title: 'Proper Handwashing Techniques',
    description: 'A video guide to effective handwashing.',
    icon: <Video className="size-6 text-primary" />,
    type: 'video',
    content: (
        <div className="aspect-video w-full rounded-lg overflow-hidden border">
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/e_hQ35R8L_M"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    )
  },
  {
    id: 'identifying-sources',
    title: 'Identifying Contaminated Water Sources',
    description: 'Key signs that a water source may be unsafe for consumption.',
    icon: <BookOpen className="size-6 text-primary" />,
    type: 'article',
    content: (
         <div className="space-y-4 text-sm text-muted-foreground">
            <p>It's crucial to identify if a water source is contaminated to prevent illness. While lab testing is the only definitive way, there are some signs you can look for:</p>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Cloudiness (Turbidity):</strong> The water is not clear.</li>
                <li><strong>Bad Smell:</strong> Water that smells like rotten eggs (sulfur) or chemicals is a warning sign.</li>
                <li><strong>Oily Film:</strong> A rainbow-colored or oily sheen on the surface can indicate pollution.</li>
                <li><strong>Proximity to Contaminants:</strong> Be cautious if the source is near septic tanks, garbage dumps, or industrial areas.</li>
            </ul>
        </div>
    )
  },
   {
    id: 'community-hygiene',
    title: 'Community Hygiene Promotion',
    description: 'Strategies for improving hygiene practices in your community.',
    icon: <BookOpen className="size-6 text-primary" />,
    type: 'article',
     content: (
         <div className="space-y-4 text-sm text-muted-foreground">
            <p>Promoting good hygiene is a community effort. As a CHW, you can lead these initiatives:</p>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Conduct Workshops:</strong> Hold sessions on handwashing, safe water storage, and food safety.</li>
                <li><strong>Distribute Information:</strong> Use posters and pamphlets in local languages.</li>
                <li><strong>Lead by Example:</strong> Always practice good hygiene yourself.</li>
                <li><strong>Engage Community Leaders:</strong> Get village elders and leaders involved to champion the cause.</li>
            </ul>
        </div>
    )
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
        {educationalContent.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
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
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{item.title}</DialogTitle>
                    <DialogDescription>{item.description}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {item.content}
                </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
