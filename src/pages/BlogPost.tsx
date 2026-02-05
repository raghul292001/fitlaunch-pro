import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { content, API_BASE_URL } from "@/services/api";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const getEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch) {
        return { type: 'youtube', src: `https://www.youtube.com/embed/${ytMatch[1]}` };
    }

    // Instagram
    if (url.includes('instagram.com')) {
        // Simple heuristic: ensure it ends with /embed/ or just use the post URL with /embed appended
        // Note: Instagram embeds often require the /embed suffix or using their script. 
        // A simple iframe approach works if the URL is modified correctly:
        // e.g. https://www.instagram.com/p/CODE/embed
        let cleanUrl = url.split('?')[0];
        if (!cleanUrl.endsWith('/')) cleanUrl += '/';
        return { type: 'instagram', src: `${cleanUrl}embed` };
    }

    return null;
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ... (useEffect remains same)

  const videoEmbed = post ? getEmbedUrl(post.videoUrl) : null;

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const res = await content.getBlogPost(id);
        setPost(res.data);
      } catch (e) {
        console.error("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center text-white">
            Loading...
        </div>
    );
  }

  if (!post) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Link to="/blog"><Button>Back to Blog</Button></Link>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-background text-gray-200">
      <Navbar />
      
      {/* Hero / Header */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        {post.image ? (
            <img 
            src={post.image.startsWith('http') ? post.image : `${API_BASE_URL}${post.image}`} 
            alt={post.title} 
            className="w-full h-full object-cover"
            />
        ) : (
            <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                <span className="text-muted-foreground">No Cover Image</span>
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6 md:p-16">
            <div className="container mx-auto max-w-4xl px-4">
                <Link to="/blog" className="inline-flex items-center text-primary hover:text-white mb-6 transition-colors font-bold uppercase text-sm tracking-widest">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                </Link>
                <div>
                    <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase inline-block mb-4">
                        {post.category}
                    </span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase leading-normal tracking-wide mb-6 max-w-3xl">
                    {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    {post.author}
                  </div>
                </div>
            </div>
        </div>
      </div>

      {/* Content */}
<div className="container mx-auto px-4 py-16 max-w-4xl">
  <div className="prose prose-invert prose-lg max-w-none
  prose-headings:font-display prose-headings:uppercase prose-headings:font-bold
  prose-headings:text-white prose-headings:tracking-wide

  prose-h3:mb-2
  prose-p:text-white prose-p:leading-loose prose-p:mb-12

  [&_p+h3]:mt-8
  [&_h3+p]:mt-6

  prose-li:text-white prose-li:leading-loose prose-li:mb-4
  prose-strong:text-white prose-strong:font-bold
          prose-a:text-primary hover:prose-a:text-primary/80 transition-colors">
             
             {videoEmbed && (
                 <div className="mb-12 w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl">
                     <iframe 
                        src={videoEmbed.src} 
                        className="w-full h-full" 
                        title="Video Player"
                        allowFullScreen 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     />
                 </div>
             )}

             <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

</div>      
      <Footer />
    </div>
  );
};

export default BlogPost;