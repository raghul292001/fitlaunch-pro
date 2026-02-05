import { useEffect, useState } from 'react';
import { content, API_BASE_URL } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const CoachesEditor = () => {
  const [coaches, setCoaches] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', role: '', bio: '', certifications: '', experience: '' });
  const [image, setImage] = useState<File | null>(null);
  const [sectionData, setSectionData] = useState({ title: '', subtitle: '', description: '' });

  const loadSection = async () => {
      try {
          const res = await content.getSection('coaches');
          setSectionData(res.data);
      } catch (e) {
          toast.error('Failed to load section data');
      }
  };

  const handleUpdateSection = async () => {
      try {
          await content.updateSection('coaches', sectionData);
          toast.success('Section updated');
      } catch (e) {
          toast.error('Failed to update section');
      }
  };

  const loadData = async () => {
    const res = await content.getCoaches();
    setCoaches(res.data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this coach?')) return;
    await content.deleteCoach(id);
    loadData();
  };

  useEffect(() => {
    loadData();
    loadSection();
  }, []);

  const handleEdit = (coach: any) => {
      setEditingId(coach._id);
      setFormData({
          name: coach.name,
          role: coach.role,
          bio: coach.bio || '',
          certifications: coach.certifications ? coach.certifications.join(', ') : '',
          experience: coach.experience || ''
      });
      // Scroll to form
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
      setEditingId(null);
      setFormData({ name: '', role: '', bio: '', certifications: '', experience: '' });
      setImage(null);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    data.append('bio', formData.bio);
    data.append('experience', formData.experience);
    data.append('certifications', formData.certifications); 
    
    if (image) data.append('image', image);

    try {
        if (editingId) {
            await content.updateCoach(editingId, data);
            toast.success('Coach updated');
        } else {
            await content.createCoach(data);
            toast.success('Coach created');
        }
        handleCancelEdit();
        loadData();
    } catch (e) {
        toast.error('Operation failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* ... Header ... */}
      <h1 className="text-3xl font-bold">Coaches</h1>

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

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coaches.map((c) => (
          <Card key={c._id} className={editingId === c._id ? 'border-primary border-2' : ''}>
            <CardContent className="pt-6 relative">
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(c)}>Edit</Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(c._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
              </div>
              {c.image && (
                <img 
                  src={`${API_BASE_URL}${c.image}`} 
                  alt={c.name} 
                  className="w-full h-64 object-cover rounded mb-4" 
                />
              )}
              <h3 className="font-bold text-lg uppercase">{c.name}</h3>
              <p className="text-sm text-primary font-bold mb-2 uppercase">{c.role}</p>
              <p className="text-xs text-muted-foreground mb-3">{c.bio}</p>
              <div className="flex flex-wrap gap-2">
                  {c.certifications && c.certifications.map((cert: string, i: number) => (
                      <span key={i} className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full font-bold">{cert}</span>
                  ))}
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded-full font-bold">{c.experience}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Form */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-bold">{editingId ? 'Edit Coach' : 'Add New Coach'}</h3>
          <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Name (e.g. MARCUS CHEN)" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
              <Input 
                placeholder="Role (e.g. Head Strength Coach)" 
                value={formData.role} 
                onChange={e => setFormData({...formData, role: e.target.value})} 
              />
              <div className="col-span-2">
                  <Textarea 
                    placeholder="Bio" 
                    value={formData.bio} 
                    onChange={e => setFormData({...formData, bio: e.target.value})} 
                  />
              </div>
              <Input 
                placeholder="Certifications (comma separated, e.g. NSCA-CSCS, NASM-CPT)" 
                value={formData.certifications} 
                onChange={e => setFormData({...formData, certifications: e.target.value})} 
              />
              <Input 
                placeholder="Experience (e.g. 12 years)" 
                value={formData.experience} 
                onChange={e => setFormData({...formData, experience: e.target.value})} 
              />
              <div className="col-span-2">
                <label className="text-sm font-medium mb-2 block">Profile Image {editingId && '(Leave empty to keep existing)'}</label>
                <Input 
                    type="file"
                    onChange={e => e.target.files && setImage(e.target.files[0])} 
                />
              </div>
          </div>
          <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1">{editingId ? 'Update Coach' : 'Add Coach'}</Button>
              {editingId && <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesEditor;
