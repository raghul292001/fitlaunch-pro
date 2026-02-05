import { useEffect, useState } from 'react';
import { content } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const TestimonialsEditor = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', message: '', rating: 5, result: '' });
  const [sectionData, setSectionData] = useState({ title: '', subtitle: '', description: '' });

  // ... (useEffect, loadSection, handleUpdateSection remain same)
  const loadSection = async () => {
      try {
          const res = await content.getSection('testimonials');
          setSectionData(res.data);
      } catch (e) {
          toast.error('Failed to load section data');
      }
  };

  const handleUpdateSection = async () => {
      try {
          await content.updateSection('testimonials', sectionData);
          toast.success('Section updated');
      } catch (e) {
          toast.error('Failed to update section');
      }
  };

  const loadData = async () => {
    const res = await content.getTestimonials();
    setTestimonials(res.data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await content.deleteTestimonial(id);
    loadData();
  };

  useEffect(() => {
    loadData();
    loadSection();
  }, []);

  const handleEdit = (t: any) => {
      setEditingId(t._id);
      setFormData({
          name: t.name,
          message: t.message,
          rating: t.rating,
          result: t.result || ''
      });
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
      setEditingId(null);
      setFormData({ name: '', message: '', rating: 5, result: '' });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('message', formData.message);
      // @ts-ignore
      data.append('rating', formData.rating);
      data.append('result', formData.result);

      if (editingId) {
          await content.updateTestimonial(editingId, data);
          toast.success('Testimonial updated');
      } else {
          await content.createTestimonial(data);
          toast.success('Testimonial created');
      }
      handleCancelEdit();
      loadData();
    } catch (e) {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Testimonials</h1>

      {/* Section Header Editor (Same as before) */}
      <Card>
          <CardContent className="pt-6 space-y-4">
              <h3 className="font-bold text-lg">Section Header</h3>
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input value={sectionData.title} onChange={e => setSectionData({...sectionData, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                      <label className="text-sm font-medium">Subtitle</label>
                      <Input value={sectionData.subtitle} onChange={e => setSectionData({...sectionData, subtitle: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea value={sectionData.description} onChange={e => setSectionData({...sectionData, description: e.target.value})} />
                  </div>
              </div>
              <Button onClick={handleUpdateSection}>Update Section Header</Button>
          </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <Card key={t._id} className={editingId === t._id ? 'border-primary border-2' : ''}>
            <CardContent className="pt-6 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(t)}>Edit</Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(t._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
              </div>
              <div className="flex gap-1 mb-2 text-primary">
                  {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="italic mb-4 text-sm text-muted-foreground line-clamp-3">"{t.message}"</p>
              <div>
                  <p className="font-bold uppercase">{t.name}</p>
                  <p className="text-xs text-primary font-medium">{t.result}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-bold">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
          <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <Input placeholder="Result / Role (e.g. Lost 30 lbs)" value={formData.result} onChange={e => setFormData({...formData, result: e.target.value})} />
              <div className="col-span-2">
                  <Textarea placeholder="Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>
              <div>
                  <label className="text-sm font-medium">Rating (1-5)</label>
                  <Input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} />
              </div>
          </div>
          <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1">{editingId ? 'Update' : 'Add'}</Button>
              {editingId && <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsEditor;
