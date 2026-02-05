import { useEffect, useState } from 'react';
import { content, API_BASE_URL } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const BlogEditor = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    excerpt: '', 
    content: '', 
    author: '', 
    category: '',
    imageUrl: '',
    videoUrl: ''
  });
  const [image, setImage] = useState<File | null>(null);

  const loadData = async () => {
    try {
      const res = await content.getBlogPosts();
      setPosts(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await content.deleteBlogPost(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (post: any) => {
      setEditingId(post._id);
      setFormData({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          category: post.category,
          imageUrl: post.image && post.image.startsWith('http') ? post.image : '',
          videoUrl: post.videoUrl || ''
      });
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
      setEditingId(null);
      setFormData({ title: '', excerpt: '', content: '', author: '', category: '', imageUrl: '', videoUrl: '' });
      setImage(null);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('excerpt', formData.excerpt);
      data.append('content', formData.content);
      data.append('author', formData.author);
      data.append('category', formData.category);
      data.append('videoUrl', formData.videoUrl);
      
      if (formData.imageUrl) {
          data.append('image', formData.imageUrl); // Send URL as text field 'image'
      }
      
      if (image) data.append('image', image); // File will override URL if both present

      if (editingId) {
          await content.updateBlogPost(editingId, data);
          toast.success('Post updated');
      } else {
          await content.createBlogPost(data);
          toast.success('Post created');
      }
      handleCancelEdit();
      loadData();
    } catch (e) {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blog Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((p) => (
          <Card key={p._id} className={editingId === p._id ? 'border-primary border-2' : ''}>
            <CardContent className="pt-6 relative">
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(p)}>Edit</Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(p._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
              </div>
              {p.image && (
                <img 
                  src={p.image.startsWith('http') ? p.image : `${API_BASE_URL}${p.image}`} 
                  alt={p.title} 
                  className="w-full h-40 object-cover rounded mb-4" 
                />
              )}
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{new Date(p.date).toLocaleDateString()} | {p.author}</p>
              <p className="text-sm line-clamp-2">{p.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-bold">{editingId ? 'Edit Post' : 'Create New Post'}</h3>
          <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <Input placeholder="Author" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
              <Input placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              <div className="col-span-2">
                  <Textarea placeholder="Excerpt (Short summary)" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
              </div>
              <div className="col-span-2">
                  <Textarea className="min-h-[200px]" placeholder="Full Content (HTML or Text)" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium mb-2 block">Cover Image</label>
                <Input 
                    type="file"
                    className="mb-2"
                    onChange={e => e.target.files && setImage(e.target.files[0])} 
                />
                <div className="text-xs text-center text-muted-foreground my-1">- OR -</div>
                <Input 
                    type="text" 
                    placeholder="Enter Image URL (e.g., https://images.unsplash.com/...)"
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium mb-2 block">Video URL (YouTube / Instagram)</label>
                <Input 
                    type="text" 
                    placeholder="e.g. https://www.youtube.com/watch?v=... or https://www.instagram.com/reel/..."
                    value={formData.videoUrl}
                    onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                />
              </div>
          </div>
          <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1">{editingId ? 'Update Post' : 'Create Post'}</Button>
              {editingId && <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogEditor;