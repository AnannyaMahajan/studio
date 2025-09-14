import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Layers, Filter } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function MapPlaceholder() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-1');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="size-5" />
          <CardTitle>Health Hotspots</CardTitle>
        </div>
        <div className="flex items-center justify-between">
          <CardDescription>
            Interactive map showing risk areas and case locations.
          </CardDescription>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Layers className="mr-2 h-4 w-4" /> Layers
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full rounded-lg overflow-hidden relative border">
          {mapImage ? (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              fill
              className="object-cover"
              data-ai-hint={mapImage.imageHint}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Map data is unavailable.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
