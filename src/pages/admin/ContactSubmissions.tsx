import { useEffect, useState } from 'react';
import { content } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Mail, Phone, Calendar } from 'lucide-react';

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await content.getContactSubmissions();
      setSubmissions(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Submissions</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {submissions.length === 0 && <p className="text-muted-foreground">No submissions yet.</p>}
        {submissions.map((sub) => (
          <Card key={sub._id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg">{sub.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(sub.date), 'PPpp')}
                    </p>
                </div>
                <div className="text-right text-sm">
                    <p className="flex items-center justify-end gap-2 text-primary"><Mail className="w-3 h-3" /> {sub.email}</p>
                    {sub.phone && <p className="flex items-center justify-end gap-2"><Phone className="w-3 h-3" /> {sub.phone}</p>}
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{sub.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactSubmissions;
