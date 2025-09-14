
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/use-translation';
import { GraduationCap, BookOpen, Video } from 'lucide-react';

export default function EducationPage() {
    const { t } = useTranslation();

    const educationalContent = [
      {
        id: 'understanding-diseases',
        title: t('education.content.1.title'),
        description: t('education.content.1.description'),
        icon: <BookOpen className="size-6 text-primary" />,
        type: 'article',
        content: (
            <div className="space-y-4 text-sm text-muted-foreground">
                <p>{t('education.content.1.p1')}</p>
                <h4 className="font-semibold text-foreground">{t('education.content.1.h4_1')}</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>{t('education.content.1.li1_1_strong')}</strong> {t('education.content.1.li1_1_text')}</li>
                    <li><strong>{t('education.content.1.li1_2_strong')}</strong> {t('education.content.1.li1_2_text')}</li>
                    <li><strong>{t('education.content.1.li1_3_strong')}</strong> {t('education.content.1.li1_3_text')}</li>
                </ul>
                <h4 className="font-semibold text-foreground">{t('education.content.1.h4_2')}</h4>
                 <ul className="list-disc pl-5 space-y-1">
                    <li>{t('education.content.1.li2_1')}</li>
                    <li>{t('education.content.1.li2_2')}</li>
                    <li>{t('education.content.1.li2_3')}</li>
                 </ul>
            </div>
        )
      },
      {
        id: 'handwashing-techniques',
        title: t('education.content.2.title'),
        description: t('education.content.2.description'),
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
        title: t('education.content.3.title'),
        description: t('education.content.3.description'),
        icon: <BookOpen className="size-6 text-primary" />,
        type: 'article',
        content: (
             <div className="space-y-4 text-sm text-muted-foreground">
                <p>{t('education.content.3.p1')}</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>{t('education.content.3.li1_strong')}</strong> {t('education.content.3.li1_text')}</li>
                    <li><strong>{t('education.content.3.li2_strong')}</strong> {t('education.content.3.li2_text')}</li>
                    <li><strong>{t('education.content.3.li3_strong')}</strong> {t('education.content.3.li3_text')}</li>
                    <li><strong>{t('education.content.3.li4_strong')}</strong> {t('education.content.3.li4_text')}</li>
                </ul>
            </div>
        )
      },
       {
        id: 'community-hygiene',
        title: t('education.content.4.title'),
        description: t('education.content.4.description'),
        icon: <BookOpen className="size-6 text-primary" />,
        type: 'article',
         content: (
             <div className="space-y-4 text-sm text-muted-foreground">
                <p>{t('education.content.4.p1')}</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>{t('education.content.4.li1_strong')}</strong> {t('education.content.4.li1_text')}</li>
                    <li><strong>{t('education.content.4.li2_strong')}</strong> {t('education.content.4.li2_text')}</li>
                    <li><strong>{t('education.content.4.li3_strong')}</strong> {t('education.content.4.li3_text')}</li>
                    <li><strong>{t('education.content.4.li4_strong')}</strong> {t('education.content.4.li4_text')}</li>
                </ul>
            </div>
        )
      },
    ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <GraduationCap className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {t('education.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('education.description')}
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
