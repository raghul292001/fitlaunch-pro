import { useEffect, useState } from 'react';
import { content } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as LucideIcons from "lucide-react";
import { Switch } from '@/components/ui/switch';

const iconOptions = [
  "Dumbbell", "Flame", "Zap", "Heart", "User", "Activity", "Timer", "Smile"
];

const ProgramsEditor = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [newProgram, setNewProgram] = useState({ name: '', shortDescription: '', icon: 'Dumbbell', cardColor: 'linear-gradient(to bottom, #3E4A1F, #5A6026)', active: true });
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [sectionData, setSectionData] = useState({ title: '', subtitle: '', description: '' });

  useEffect(() => {
    loadData();
    loadSection();
  }, []);

  const loadSection = async () => {
      try {
          const res = await content.getSection('programs');
          setSectionData(res.data);
      } catch (e) {
          toast.error('Failed to load section data');
      }
  };

  const handleUpdateSection = async () => {
      try {
          await content.updateSection('programs', sectionData);
          toast.success('Section updated');
      } catch (e) {
          toast.error('Failed to update section');
      }
  };

  const loadData = async () => {
    try {
        const res = await content.getPrograms();
        setPrograms(res.data);
    } catch (e) {
        toast.error('Failed to load programs');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this program?')) return;
    try {
        await content.deleteProgram(id);
        toast.success('Program deleted');
        loadData();
    } catch (e) {
        toast.error('Failed to delete program');
    }
  };

  const handleCreate = async () => {
    try {
      await content.createProgram(newProgram);
      setNewProgram({ name: '', shortDescription: '', icon: 'Dumbbell', cardColor: 'linear-gradient(to bottom, #3E4A1F, #5A6026)', active: true });
      toast.success('Program created');
      loadData();
    } catch (e) {
      toast.error('Failed to create program');
    }
  };

  const handleUpdate = async () => {
      if (!editingProgram) return;
      try {
          await content.updateProgram(editingProgram._id, editingProgram);
          setEditingProgram(null);
          toast.success('Program updated');
          loadData();
      } catch (e) {
          toast.error('Failed to update program');
      }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Programs</h1>

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs.map((p) => {
            // @ts-ignore
            const Icon = LucideIcons[p.icon] || LucideIcons.Dumbbell;
            return (
              <Card key={p._id}>
                <CardContent className="pt-6 relative">
                  <div className="absolute top-2 right-2 flex gap-2">
                      <Button size="icon" variant="outline" onClick={() => setEditingProgram(p)}>
                          <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(p._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                  </div>

                  {editingProgram && editingProgram._id === p._id ? (
                      <div className="space-y-3 mt-6">
                          <Input value={editingProgram.name} onChange={e => setEditingProgram({...editingProgram, name: e.target.value})} placeholder="Program Name" />
                          <Textarea value={editingProgram.shortDescription} onChange={e => setEditingProgram({...editingProgram, shortDescription: e.target.value})} placeholder="Description" />
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Icon</label>
                            <Select value={editingProgram.icon} onValueChange={(val) => setEditingProgram({...editingProgram, icon: val})}>
                                <SelectTrigger><SelectValue placeholder="Select Icon" /></SelectTrigger>
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

                          <div className="space-y-2">
                              <label className="text-sm font-medium">Card Color</label>
                              <div className="flex gap-2">
                                  <div 
                                      className="w-10 h-10 rounded border flex-shrink-0" 
                                      style={{ background: editingProgram.cardColor }} 
                                      title="Preview"
                                  />
                                  <Input value={editingProgram.cardColor} onChange={e => setEditingProgram({...editingProgram, cardColor: e.target.value})} placeholder="linear-gradient(to bottom, #3E4A1F, #5A6026)" />
                              </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={editingProgram.active}
                              onCheckedChange={checked => setEditingProgram({...editingProgram, active: checked})}
                            />
                            <label>Active</label>
                          </div>

                          <div className="flex gap-2">
                              <Button onClick={handleUpdate} className="flex-1">Save</Button>
                              <Button variant="ghost" onClick={() => setEditingProgram(null)} className="flex-1">Cancel</Button>
                          </div>
                      </div>
                  ) : (
                      <>
                        <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 opacity-80"
                            style={{ background: p.cardColor }}
                        >
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">{p.name}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{p.shortDescription}</p>
                        <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${p.active !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {p.active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </>
                  )}
                </CardContent>
              </Card>
            );
        })}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-bold">Add New Program</h3>
          <Input placeholder="Program Name" value={newProgram.name} onChange={e => setNewProgram({...newProgram, name: e.target.value})} />
          <Textarea placeholder="Description" value={newProgram.shortDescription} onChange={e => setNewProgram({...newProgram, shortDescription: e.target.value})} />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Icon</label>
            <Select value={newProgram.icon} onValueChange={(val) => setNewProgram({...newProgram, icon: val})}>
                <SelectTrigger><SelectValue placeholder="Select Icon" /></SelectTrigger>
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

          <div className="space-y-2">
              <label className="text-sm font-medium">Card Color</label>
              <div className="flex gap-2">
                  <div 
                      className="w-10 h-10 rounded border flex-shrink-0" 
                      style={{ background: newProgram.cardColor }} 
                      title="Preview"
                  />
                  <Input placeholder="linear-gradient(to bottom, #3E4A1F, #5A6026)" value={newProgram.cardColor} onChange={e => setNewProgram({...newProgram, cardColor: e.target.value})} />
              </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch 
              checked={newProgram.active}
              onCheckedChange={checked => setNewProgram({...newProgram, active: checked})}
            />
            <label>Active</label>
          </div>

          <Button onClick={handleCreate} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Program</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramsEditor;
