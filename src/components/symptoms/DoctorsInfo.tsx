
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DoctorInfo } from "@/data/diseases";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorsInfoProps {
  doctors: DoctorInfo[];
  specialty: string;
}

const DoctorsInfo = ({ doctors, specialty }: DoctorsInfoProps) => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-revon-primary" />
          {specialty} Specialists in Tamil Nadu
        </CardTitle>
      </CardHeader>
      <CardContent>
        {doctors.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor Name</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.hospital}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {doctor.location}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {doctor.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {doctor.contact}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {doctor.mapsLink && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={doctor.mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            View Map
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No doctors found for this specialty in the database.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorsInfo;
