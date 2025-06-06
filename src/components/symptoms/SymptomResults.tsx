
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, ArrowLeft, MapPin, Utensils, FileText, HeartPulse, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Disease, DoctorInfo } from "@/data/diseases";
import DoctorsInfo from "./DoctorsInfo";

type Results = {
  diseases: Disease[];
  precautions: string[];
  diet: string[];
  doctors: DoctorInfo[];
};

interface SymptomResultsProps {
  results: Results;
  onBack: () => void;
}

const SymptomResults = ({ results, onBack }: SymptomResultsProps) => {
  const { diseases, precautions, diet, doctors } = results;
  const primaryDisease = diseases[0];
  
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-revon-primary" />
            Analysis Results
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="diseases" className="w-full">
        <div className="px-6 pt-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="diseases">Conditions</TabsTrigger>
            <TabsTrigger value="precautions">Precautions</TabsTrigger>
            <TabsTrigger value="diet">Diet</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="diseases" className="p-6">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Based on the symptoms you provided, these are the potential conditions:
            </p>
            
            <div className="space-y-4">
              {diseases.map((disease, index) => (
                <div key={disease.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {disease.name}
                        {disease.isFallback && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                            Fallback Prediction
                          </span>
                        )}
                      </h3>
                      <div className="text-xs text-muted-foreground">
                        Specialist: {disease.specialist}
                      </div>
                    </div>
                    <span className="text-sm font-semibold bg-revon-primary/10 text-revon-primary px-2 py-1 rounded">
                      {disease.probability}% match
                    </span>
                  </div>
                  <Progress value={disease.probability} className="h-2 mb-3" />
                  <p className="text-sm text-muted-foreground">{disease.description}</p>
                </div>
              ))}
            </div>
            
            {diseases.some(d => d.isFallback) && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-500">
                      Fallback Prediction Notice
                    </p>
                    <p className="mt-1 text-yellow-700 dark:text-yellow-400">
                      Due to technical limitations, we've provided a fallback prediction. Please consult with the recommended specialist for an accurate diagnosis.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {primaryDisease && doctors.length > 0 && (
              <DoctorsInfo doctors={doctors} specialty={primaryDisease.specialist} />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="precautions" className="p-6">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Consider these precautionary measures based on your symptoms:
            </p>
            
            <div className="space-y-3">
              {precautions.map((precaution, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="h-8 w-8 rounded-full bg-revon-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4 w-4 text-revon-primary" />
                  </div>
                  <span>{precaution}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <Button asChild variant="outline">
                <a href="#" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Find Nearby Hospitals
                </a>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="diet" className="p-6">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Dietary recommendations that may help with your condition:
            </p>
            
            <div className="space-y-3">
              {diet.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="h-8 w-8 rounded-full bg-revon-primary/10 flex items-center justify-center shrink-0">
                    <Utensils className="h-4 w-4 text-revon-primary" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="border-t px-6 py-4 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          New Analysis
        </Button>
        
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Save Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomResults;
