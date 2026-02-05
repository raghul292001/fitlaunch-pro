import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as LucideIcons from "lucide-react";
import { useEffect, useState } from 'react';
import { content } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
// Common fitness icons
const iconOptions = [
  "Dumbbell", "Award", "Calendar", "Apple", "Activity", "Heart", 
  "Zap", "Users", "Trophy", "Star", "Settings", "Timer", "Smile"
];

const FeaturesEditor = () => {
  // ... existing state ...
  const [features, setFeatures] = useState<any[]>([]);
  const [newFeature, setNewFeature] = useState({ title: '', description: '', icon: 'Dumbbell', active: true });
  const [editingFeature, setEditingFeature] = useState<any>(null);
  const [sectionData, setSectionData] = useState({ title: '', subtitle: '', description: '' });

  useEffect(() => {
    loadData();
    loadSection();
  }, []);

  const loadSection = async () => {
      try {
          const res = await content.getSection('features');
          setSectionData(res.data);
      } catch (e) {
          toast.error('Failed to load section data');
      }
  };

  const handleUpdateSection = async () => {
      try {
          await content.updateSection('features', sectionData);
          toast.success('Section updated');
      } catch (e) {
          toast.error('Failed to update section');
      }
  };

  const loadData = async () => {
    try {
        const res = await content.getFeatures();
        setFeatures(res.data);
    } catch (e) {
        toast.error('Failed to load features');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this feature?')) return;
    try {
        await content.deleteFeature(id);
        toast.success('Feature deleted');
        loadData();
    } catch (e) {
        toast.error('Failed to delete feature');
    }
  };

  const handleCreate = async () => {
    try {
        await content.createFeature(newFeature);
        setNewFeature({ title: '', description: '', icon: 'Dumbbell', active: true });
        toast.success('Feature created');
        loadData();
    } catch (e) {
        toast.error('Failed to create feature');
    }
  };

  const handleUpdate = async () => {
      if (!editingFeature) return;
      try {
          await content.updateFeature(editingFeature._id, editingFeature);
          setEditingFeature(null);
          toast.success('Feature updated');
          loadData();
      } catch (e) {
          toast.error('Failed to update feature');
      }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Features / Services</h1>

      {/* Section Header Editor */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f) => {
            // @ts-ignore
            const Icon = LucideIcons[f.icon] || LucideIcons.Dumbbell;
            return (
              <Card key={f._id}>
                <CardContent className="pt-6 relative">
                  {/* ... buttons ... */}
                  <div className="absolute top-2 right-2 flex gap-2">
                      <Button size="icon" variant="outline" onClick={() => setEditingFeature(f)}>
                          <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDelete(f._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                  </div>
                  
                  {editingFeature && editingFeature._id === f._id ? (
                      <div className="space-y-3 mt-6">
                          <Input 
                            value={editingFeature.title} 
                            onChange={e => setEditingFeature({...editingFeature, title: e.target.value})} 
                            placeholder="Title"
                          />
                          <Textarea 
                            value={editingFeature.description} 
                            onChange={e => setEditingFeature({...editingFeature, description: e.target.value})} 
                            placeholder="Description"
                          />
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Icon</label>
                            <Select 
                                value={editingFeature.icon} 
                                onValueChange={(val) => setEditingFeature({...editingFeature, icon: val})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Icon" />
                                </SelectTrigger>
                                <SelectContent>
                                    {iconOptions.map(icon => (
                                        <SelectItem key={icon} value={icon}>
                                            <div className="flex items-center gap-2">
                                                {/* @ts-ignore */}
                                                {LucideIcons[icon] && (() => { const I = LucideIcons[icon]; return <I className="w-4 h-4" /> })()}
                                                {icon}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={editingFeature.active}
                              onCheckedChange={checked => setEditingFeature({...editingFeature, active: checked})}
                            />
                            <label>Active</label>
                          </div>
                          <div className="flex gap-2">
                              <Button onClick={handleUpdate} className="flex-1">Save</Button>
                              <Button variant="ghost" onClick={() => setEditingFeature(null)} className="flex-1">Cancel</Button>
                          </div>
                      </div>
                  ) : (
                      <>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-bold">{f.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{f.description}</p>
                        <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${f.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {f.active ? 'Active' : 'Inactive'}
                        </span>
                      </>
                  )}
                </CardContent>
              </Card>
            );
        })}
      </div>

      {/* Add New Feature */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-bold">Add New Feature</h3>
          <Input 
            placeholder="Title" 
            value={newFeature.title} 
            onChange={e => setNewFeature({...newFeature, title: e.target.value})} 
          />
          <Textarea 
            placeholder="Description" 
            value={newFeature.description} 
            onChange={e => setNewFeature({...newFeature, description: e.target.value})} 
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Icon</label>
            <Select 
                value={newFeature.icon} 
                onValueChange={(val) => setNewFeature({...newFeature, icon: val})}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Icon" />
                </SelectTrigger>
                <SelectContent>
                    {iconOptions.map(icon => (
                        <SelectItem key={icon} value={icon}>
                            <div className="flex items-center gap-2">
                                {/* @ts-ignore */}
                                {LucideIcons[icon] && (() => { const I = LucideIcons[icon]; return <I className="w-4 h-4" /> })()}
                                {icon}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Switch 
              checked={newFeature.active}
              onCheckedChange={checked => setNewFeature({...newFeature, active: checked})}
            />
            <label>Active</label>
          </div>
          <Button onClick={handleCreate} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Feature</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesEditor;
