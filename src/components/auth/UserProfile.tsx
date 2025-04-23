
import React from 'react';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, History } from 'lucide-react';

interface UserProfileProps {
  onBack?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { user, logout, history } = useAuth();

  if (!user) {
    return null;
  }

  // Sort history from newest to oldest
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">My Health Profile</CardTitle>
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>
        <CardDescription>
          Manage your account and view your medical history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4 space-y-4">
            <div className="grid gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                <p className="text-base font-medium">{user.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-base font-medium">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                <p className="text-base font-medium">
                  {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            {sortedHistory.length > 0 ? (
              <Table>
                <TableCaption>Your medical history records</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Symptoms</TableHead>
                    <TableHead>Diagnosis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {formatDistanceToNow(new Date(record.createdAt), { addSuffix: true })}
                      </TableCell>
                      <TableCell>{record.symptoms.join(", ")}</TableCell>
                      <TableCell>
                        {record.diagnosis.map((d: any, i: number) => (
                          <span key={i} className="block">
                            {d.name}: {d.probability}%
                          </span>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <History className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No medical history records found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
