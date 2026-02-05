import { useEffect, useState } from 'react';
import { content } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Plus, X } from 'lucide-react';

const PricingEditor = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [ptPlans, setPtPlans] = useState<any[]>([]);
  const [newPlan, setNewPlan] = useState({ name: '', subtitle: '', price: 0, duration: '/month', features: [''] });
  const [newPtPlan, setNewPtPlan] = useState({ name: '', subLabel: '', price: 0, features: [''] });
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [editingPtPlan, setEditingPtPlan] = useState<any>(null);
  const [sectionData, setSectionData] = useState({ title: '', subtitle: '', description: '' });
  const [ptSectionData, setPtSectionData] = useState({ title: '', subtitle: '', description: '' });

  useEffect(() => {
    loadData();
    loadSections();
  }, []);

  const loadSections = async () => {
      try {
          const res = await content.getSection('pricing');
          setSectionData(res.data);
          const ptRes = await content.getSection('personal-training');
          setPtSectionData(ptRes.data);
      } catch (e) {
          toast.error('Failed to load section data');
      }
  };

  const handleUpdateSection = async (sectionName: string, data: any) => {
      try {
          await content.updateSection(sectionName, data);
          toast.success('Section updated');
      } catch (e) {
          toast.error('Failed to update section');
      }
  };

  const loadData = async () => {
    try {
      const res = await content.getPricing();
      setPlans(res.data || []);
      const ptRes = await content.getPersonalTraining();
      setPtPlans(ptRes.data || []);
    } catch (error) {
      console.error("Failed to load pricing data", error);
      toast.error("Failed to load data");
      setPlans([]);
      setPtPlans([]);
    }
  };

  // Handlers for Pricing Plans
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this plan?')) return;
    await content.deletePricing(id);
    toast.success('Plan deleted');
    loadData();
  };

  const handleCreate = async () => {
    try {
      await content.createPricing(newPlan);
      toast.success('Plan created');
      setNewPlan({ name: '', subtitle: '', price: 0, duration: '/month', features: [''] });
      loadData();
    } catch (e) {
      toast.error('Error creating plan');
    }
  };

  const handleUpdate = async () => {
    if (!editingPlan) return;
    try {
      await content.updatePricing(editingPlan._id, editingPlan);
      toast.success('Plan updated');
      setEditingPlan(null);
      loadData();
    } catch (e) {
      toast.error('Error updating plan');
    }
  };

  const handleFeatureChange = (index: number, value: string, isEditing: boolean) => {
    if (isEditing) {
      const features = [...editingPlan.features];
      features[index] = value;
      setEditingPlan({ ...editingPlan, features });
    } else {
      const features = [...newPlan.features];
      features[index] = value;
      setNewPlan({ ...newPlan, features });
    }
  };

  const addFeature = (isEditing: boolean) => {
    if (isEditing) {
      setEditingPlan({ ...editingPlan, features: [...editingPlan.features, ''] });
    } else {
      setNewPlan({ ...newPlan, features: [...newPlan.features, ''] });
    }
  };

  const removeFeature = (index: number, isEditing: boolean) => {
    if (isEditing) {
      const features = editingPlan.features.filter((_: any, i: number) => i !== index);
      setEditingPlan({ ...editingPlan, features });
    } else {
      const features = newPlan.features.filter((_: any, i: number) => i !== index);
      setNewPlan({ ...newPlan, features });
    }
  };

  // Handlers for Personal Training
  const handlePtDelete = async (id: string) => {
    if (!confirm('Delete this package?')) return;
    await content.deletePersonalTraining(id);
    toast.success('Package deleted');
    loadData();
  };

  const handlePtCreate = async () => {
    try {
      await content.createPersonalTraining(newPtPlan);
      toast.success('Package created');
      setNewPtPlan({ name: '', subLabel: '', price: 0, features: [''] });
      loadData();
    } catch (e) {
      toast.error('Error creating package');
    }
  };

  const handlePtUpdate = async () => {
    if (!editingPtPlan) return;
    try {
        await content.updatePersonalTraining(editingPtPlan._id, editingPtPlan);
        toast.success('Package updated');
        setEditingPtPlan(null);
        loadData();
    } catch (e) {
        toast.error('Error updating package');
    }
  };

  const handlePtFeatureChange = (index: number, value: string, isEditing: boolean) => {
      if (isEditing) {
          const features = [...editingPtPlan.features];
          features[index] = value;
          setEditingPtPlan({ ...editingPtPlan, features });
      } else {
          const features = [...newPtPlan.features];
          features[index] = value;
          setNewPtPlan({ ...newPtPlan, features });
      }
  };

  const addPtFeature = (isEditing: boolean) => {
      if (isEditing) {
          setEditingPtPlan({ ...editingPtPlan, features: [...editingPtPlan.features, ''] });
      } else {
          setNewPtPlan({ ...newPtPlan, features: [...newPtPlan.features, ''] });
      }
  };

  const removePtFeature = (index: number, isEditing: boolean) => {
      if (isEditing) {
          const features = editingPtPlan.features.filter((_: any, i: number) => i !== index);
          setEditingPtPlan({ ...editingPtPlan, features });
      } else {
          const features = newPtPlan.features.filter((_: any, i: number) => i !== index);
          setNewPtPlan({ ...newPtPlan, features });
      }
  };

  return (
    <div className="space-y-12">
      {/* Gym Membership Section */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gym Membership Plans</h1>

        {/* Section Header Editor */}
        <Card>
            <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold text-lg">Membership Section Header</h3>
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
                <Button onClick={() => handleUpdateSection('pricing', sectionData)}>Update Header</Button>
            </CardContent>
        </Card>

        {/* ... (Existing List and Form for Plans, updated to include subtitle input) ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan._id}>
            <CardContent className="pt-6 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditingPlan(plan)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(plan._id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              {editingPlan && editingPlan._id === plan._id ? (
                <div className="space-y-3 mt-8">
                  <Input value={editingPlan.name} onChange={e => setEditingPlan({...editingPlan, name: e.target.value})} placeholder="Name" />
                  <Input value={editingPlan.subtitle} onChange={e => setEditingPlan({...editingPlan, subtitle: e.target.value})} placeholder="Subtitle (e.g. Start your journey)" />
                  <Input type="number" value={editingPlan.price} onChange={e => setEditingPlan({...editingPlan, price: Number(e.target.value)})} placeholder="Price" />
                  {/* ... rest of edit form ... */}
                  <Input value={editingPlan.duration} onChange={e => setEditingPlan({...editingPlan, duration: e.target.value})} placeholder="Duration" />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Features</label>
                    {editingPlan.features.map((f: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <Input value={f} onChange={e => handleFeatureChange(i, e.target.value, true)} />
                        <Button size="icon" variant="ghost" onClick={() => removeFeature(i, true)}><X className="w-4 h-4" /></Button>
                      </div>
                    ))}
                    <Button size="sm" variant="outline" onClick={() => addFeature(true)} className="w-full">Add Feature</Button>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleUpdate} className="flex-1">Save</Button>
                    <Button variant="ghost" onClick={() => setEditingPlan(null)} className="flex-1">Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{plan.subtitle}</p>
                  <p className="text-2xl font-bold text-primary">₹{plan.price}</p>
                  <p className="text-sm text-muted-foreground">{plan.duration}</p>
                  <ul className="mt-4 list-disc list-inside text-sm">
                    {plan.features.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-bold">Add New Membership Plan</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="Name (e.g. Basic)" 
              value={newPlan.name} 
              onChange={e => setNewPlan({...newPlan, name: e.target.value})} 
            />
            <Input 
              placeholder="Subtitle (e.g. Start your journey)" 
              value={newPlan.subtitle} 
              onChange={e => setNewPlan({...newPlan, subtitle: e.target.value})} 
            />
            <Input 
              placeholder="Price" 
              type="text"
              value={newPlan.price} 
              onChange={e => setNewPlan({...newPlan, price: Number(e.target.value)})} 
            />
            <Input 
              placeholder="Duration (e.g. /month)" 
              value={newPlan.duration} 
              onChange={e => setNewPlan({...newPlan, duration: e.target.value})} 
            />
          </div>
          {/* Features input logic same as before */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Features</label>
            {newPlan.features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <Input value={f} onChange={e => handleFeatureChange(i, e.target.value, false)} placeholder="Feature description" />
                <Button size="icon" variant="ghost" onClick={() => removeFeature(i, false)}><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => addFeature(false)}>Add Feature</Button>
          </div>
          <Button onClick={handleCreate} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Plan</Button>
        </CardContent>
      </Card>
      </div>

      {/* Personal Trainer Section */}
      <div className="space-y-6 pt-8 border-t">
        <h1 className="text-3xl font-bold">Personal Trainer Packages</h1>

        {/* PT Section Header Editor */}
        <Card>
            <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold text-lg">Personal Trainer Section Header</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input value={ptSectionData.title} onChange={e => setPtSectionData({...ptSectionData, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Subtitle</label>
                        <Input value={ptSectionData.subtitle} onChange={e => setPtSectionData({...ptSectionData, subtitle: e.target.value})} />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea value={ptSectionData.description} onChange={e => setPtSectionData({...ptSectionData, description: e.target.value})} />
                    </div>
                </div>
                <Button onClick={() => handleUpdateSection('personal-training', ptSectionData)}>Update Header</Button>
            </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ptPlans.map((plan) => (
                <Card key={plan._id}>
                    <CardContent className="pt-6 relative">
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setEditingPtPlan(plan)}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => handlePtDelete(plan._id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        
                        {editingPtPlan && editingPtPlan._id === plan._id ? (
                            <div className="space-y-3 mt-8">
                                <Input value={editingPtPlan.name} onChange={e => setEditingPtPlan({...editingPtPlan, name: e.target.value})} placeholder="Name" />
                                <Input value={editingPtPlan.subLabel} onChange={e => setEditingPtPlan({...editingPtPlan, subLabel: e.target.value})} placeholder="Sub Label (e.g. FOR 1 PERSON)" />
                                <Input type="number" value={editingPtPlan.price} onChange={e => setEditingPtPlan({...editingPtPlan, price: Number(e.target.value)})} placeholder="Price" />
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Features</label>
                                    {editingPtPlan.features.map((f: string, i: number) => (
                                        <div key={i} className="flex gap-2">
                                            <Input value={f} onChange={e => handlePtFeatureChange(i, e.target.value, true)} />
                                            <Button size="icon" variant="ghost" onClick={() => removePtFeature(i, true)}><X className="w-4 h-4" /></Button>
                                        </div>
                                    ))}
                                    <Button size="sm" variant="outline" onClick={() => addPtFeature(true)} className="w-full">Add Feature</Button>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={handlePtUpdate} className="flex-1">Save</Button>
                                    <Button variant="ghost" onClick={() => setEditingPtPlan(null)} className="flex-1">Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground">{plan.subLabel}</p>
                                <h3 className="font-bold text-xl">{plan.name}</h3>
                                <p className="text-2xl font-bold text-primary">₹{plan.price}</p>
                                <ul className="mt-4 list-disc list-inside text-sm">
                                    {plan.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
                                </ul>
                            </>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
            <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold">Add Personal Trainer Package</h3>
                <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="Name (e.g. Individual Package)" value={newPtPlan.name} onChange={e => setNewPtPlan({...newPtPlan, name: e.target.value})} />
                    <Input placeholder="Sub Label (e.g. FOR 1 PERSON)" value={newPtPlan.subLabel} onChange={e => setNewPtPlan({...newPtPlan, subLabel: e.target.value})} />
                    <Input placeholder="Price" type="number" value={newPtPlan.price} onChange={e => setNewPtPlan({...newPtPlan, price: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Features</label>
                    {newPtPlan.features.map((f, i) => (
                        <div key={i} className="flex gap-2">
                            <Input value={f} onChange={e => handlePtFeatureChange(i, e.target.value, false)} placeholder="Feature description" />
                            <Button size="icon" variant="ghost" onClick={() => removePtFeature(i, false)}><X className="w-4 h-4" /></Button>
                        </div>
                    ))}
                    <Button size="sm" variant="outline" onClick={() => addPtFeature(false)}>Add Feature</Button>
                </div>
                <Button onClick={handlePtCreate} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Package</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingEditor;
