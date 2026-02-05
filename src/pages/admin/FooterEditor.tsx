import { useEffect, useState } from 'react';
import { content } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const FooterEditor = () => {
  const [data, setData] = useState({
    brand: { title: '', description: '' },
    contact: {
      address: '',
      phone: '',
      email: '',
      openingHours: { weekday: '', weekend: '' }
    },
    social: {
      instagram: { url: '', active: true },
      facebook: { url: '', active: true },
      twitter: { url: '', active: true },
      youtube: { url: '', active: true }
    },
    quickLinks: [] as { label: string, href: string }[],
    newsletter: { enabled: true, title: '', description: '', cta: '' },
    legal: [] as { label: string, href: string }[],
    copyrightText: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await content.getFooter();
      if (res.data) {
        // Merge with default state to avoid undefined errors (controlled input warning)
        setData(prev => ({
          ...prev,
          ...res.data,
          brand: { ...prev.brand, ...res.data.brand },
          contact: { 
            ...prev.contact, 
            ...res.data.contact,
            openingHours: { ...prev.contact.openingHours, ...res.data.contact?.openingHours }
          },
          social: {
            instagram: { ...prev.social.instagram, ...res.data.social?.instagram },
            facebook: { ...prev.social.facebook, ...res.data.social?.facebook },
            twitter: { ...prev.social.twitter, ...res.data.social?.twitter },
            youtube: { ...prev.social.youtube, ...res.data.social?.youtube }
          },
          newsletter: { ...prev.newsletter, ...res.data.newsletter }
        }));
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to load footer data');
    }
  };

  const handleSave = async () => {
    try {
      await content.updateFooter(data);
      toast.success('Footer updated');
    } catch (e) {
      toast.error('Failed to update footer');
    }
  };

  const updateSocial = (platform: 'instagram' | 'facebook' | 'twitter' | 'youtube', field: 'url' | 'active', value: any) => {
    setData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: {
          ...prev.social[platform],
          [field]: value
        }
      }
    }));
  };

  const addLink = (type: 'quickLinks' | 'legal') => {
    setData(prev => ({
      ...prev,
      [type]: [...prev[type], { label: '', href: '#' }]
    }));
  };

  const updateLink = (type: 'quickLinks' | 'legal', index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...data[type]];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setData(prev => ({ ...prev, [type]: newLinks }));
  };

  const removeLink = (type: 'quickLinks' | 'legal', index: number) => {
    const newLinks = data[type].filter((_, i) => i !== index);
    setData(prev => ({ ...prev, [type]: newLinks }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Footer & Contact</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand Section */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-bold">Brand Info</h3>
            <div>
              <label className="text-sm font-medium">Brand Title</label>
              <Input value={data.brand.title} onChange={e => setData({...data, brand: {...data.brand, title: e.target.value}})} />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea value={data.brand.description} onChange={e => setData({...data, brand: {...data.brand, description: e.target.value}})} />
            </div>
            <div>
              <label className="text-sm font-medium">Copyright Text</label>
              <Input value={data.copyrightText} onChange={e => setData({...data, copyrightText: e.target.value})} />
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-bold">Contact Info</h3>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input value={data.contact.address} onChange={e => setData({...data, contact: {...data.contact, address: e.target.value}})} />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input value={data.contact.phone} onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input value={data.contact.email} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium">Weekday Hours</label>
                <Input value={data.contact.openingHours.weekday} onChange={e => setData({...data, contact: {...data.contact, openingHours: {...data.contact.openingHours, weekday: e.target.value}}})} />
              </div>
              <div>
                <label className="text-sm font-medium">Weekend Hours</label>
                <Input value={data.contact.openingHours.weekend} onChange={e => setData({...data, contact: {...data.contact, openingHours: {...data.contact.openingHours, weekend: e.target.value}}})} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-bold">Social Media</h3>
            {(['instagram', 'facebook', 'twitter', 'youtube'] as const).map(platform => (
              <div key={platform} className="flex items-center gap-4">
                <div className="w-24 capitalize font-medium">{platform}</div>
                <Input 
                  placeholder="URL" 
                  value={data.social[platform].url} 
                  onChange={e => updateSocial(platform, 'url', e.target.value)} 
                />
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={data.social[platform].active}
                    onCheckedChange={checked => updateSocial(platform, 'active', checked)}
                  />
                  <span className="text-xs">{data.social[platform].active ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Newsletter */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Newsletter</h3>
              <Switch 
                checked={data.newsletter.enabled}
                onCheckedChange={checked => setData({...data, newsletter: {...data.newsletter, enabled: checked}})}
              />
            </div>
            {data.newsletter.enabled && (
              <>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input value={data.newsletter.title} onChange={e => setData({...data, newsletter: {...data.newsletter, title: e.target.value}})} />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input value={data.newsletter.description} onChange={e => setData({...data, newsletter: {...data.newsletter, description: e.target.value}})} />
                </div>
                <div>
                  <label className="text-sm font-medium">Button Text</label>
                  <Input value={data.newsletter.cta} onChange={e => setData({...data, newsletter: {...data.newsletter, cta: e.target.value}})} />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Quick Links</h3>
              <Button size="sm" variant="outline" onClick={() => addLink('quickLinks')}><Plus className="w-4 h-4" /></Button>
            </div>
            {data.quickLinks.map((link, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Label" value={link.label} onChange={e => updateLink('quickLinks', i, 'label', e.target.value)} />
                <Input placeholder="Link (#)" value={link.href} onChange={e => updateLink('quickLinks', i, 'href', e.target.value)} />
                <Button size="icon" variant="ghost" onClick={() => removeLink('quickLinks', i)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Legal Links */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Legal Links</h3>
              <Button size="sm" variant="outline" onClick={() => addLink('legal')}><Plus className="w-4 h-4" /></Button>
            </div>
            {data.legal.map((link, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Label" value={link.label} onChange={e => updateLink('legal', i, 'label', e.target.value)} />
                <Input placeholder="Link (#)" value={link.href} onChange={e => updateLink('legal', i, 'href', e.target.value)} />
                <Button size="icon" variant="ghost" onClick={() => removeLink('legal', i)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleSave} className="w-full text-lg py-6">Save All Changes</Button>
    </div>
  );
};

export default FooterEditor;
