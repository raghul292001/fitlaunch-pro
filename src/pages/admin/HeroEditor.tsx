import { useEffect, useState } from 'react';
import { content, API_BASE_URL } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const HeroEditor = () => {
  const [formData, setFormData] = useState({
    mainHeading1: '',
    highlightedHeading1: '',
    mainHeading2: '',
    highlightedHeading2: '',
    subheading: '',
    primaryCtaText: '',
    secondaryCtaText: ''
  });
  const [stats, setStats] = useState([
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' }
  ]);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await content.getHero();
      if (res.data) {
        setFormData({
          mainHeading1: res.data.mainHeading1 || '',
          highlightedHeading1: res.data.highlightedHeading1 || '',
          mainHeading2: res.data.mainHeading2 || '',
          highlightedHeading2: res.data.highlightedHeading2 || '',
          subheading: res.data.subheading || '',
          primaryCtaText: res.data.primaryCtaText || '',
          secondaryCtaText: res.data.secondaryCtaText || ''
        });
        if (res.data.stats && res.data.stats.length > 0) {
            setStats(res.data.stats);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key as keyof typeof formData]));
      data.append('stats', JSON.stringify(stats));
      
      if (image) data.append('image', image);

      await content.updateHero(data);
      toast.success('Hero section updated');
    } catch (e) {
      toast.error('Failed to update hero section');
    }
  };

  const updateStat = (index: number, field: 'value' | 'label', value: string) => {
      const newStats = [...stats];
      newStats[index][field] = value;
      setStats(newStats);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hero Section Editor</h1>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Main Heading Line 1</label>
                <Input value={formData.mainHeading1} onChange={e => setFormData({...formData, mainHeading1: e.target.value})} placeholder="TRANSFORM YOUR" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Highlighted Heading 1 (Yellow)</label>
                <Input value={formData.highlightedHeading1} onChange={e => setFormData({...formData, highlightedHeading1: e.target.value})} placeholder="BODY" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Main Heading Line 2</label>
                <Input value={formData.mainHeading2} onChange={e => setFormData({...formData, mainHeading2: e.target.value})} placeholder="TRANSFORM YOUR" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Highlighted Heading 2 (Yellow)</label>
                <Input value={formData.highlightedHeading2} onChange={e => setFormData({...formData, highlightedHeading2: e.target.value})} placeholder="LIFE." />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subheading</label>
            <Textarea value={formData.subheading} onChange={e => setFormData({...formData, subheading: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
                placeholder="Primary CTA Text" 
                value={formData.primaryCtaText} 
                onChange={e => setFormData({...formData, primaryCtaText: e.target.value})} 
            />
            <Input 
                placeholder="Secondary CTA Text" 
                value={formData.secondaryCtaText} 
                onChange={e => setFormData({...formData, secondaryCtaText: e.target.value})} 
            />
          </div>

          <div className="space-y-2">
              <label className="text-sm font-medium">Stats (Value / Label)</label>
              {stats.map((stat, i) => (
                  <div key={i} className="flex gap-2">
                      <Input value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="Value (e.g. 10K+)" />
                      <Input value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label (e.g. Active Members)" />
                  </div>
              ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Background Image</label>
            <Input type="file" onChange={e => e.target.files && setImage(e.target.files[0])} />
          </div>

          <Button onClick={handleSubmit}>Update Hero Section</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroEditor;
