import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import { content, API_BASE_URL } from "@/services/api";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await content.getBlogPosts();
        setBlogPosts(res.data);
      } catch (e) {
        console.error("Failed to fetch blog posts");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-extrabold uppercase tracking-widest text-sm mb-4 block">Our Blog</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white uppercase mb-6">Fitness Insights & Tips</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
            Expert advice on training, nutrition, and wellness to help you reach your goals faster.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post._id} className="bg-card border-border/10 overflow-hidden hover:border-primary/50 transition-colors group flex flex-col">
              <div className="relative h-48 overflow-hidden bg-muted">
                {post.image ? (
                    <img 
                    src={post.image.startsWith('http') ? post.image : `${API_BASE_URL}${post.image}`} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                )}
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">
                  {post.category}
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-semibold">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold uppercase text-white group-hover:text-primary transition-colors leading-normal tracking-wide">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-gray-400 font-medium line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild variant="link" className="text-primary p-0 hover:text-primary/80 uppercase font-bold text-xs tracking-widest">
                  <Link to={`/blog/${post._id}`}>
                    Read More &rarr;
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {blogPosts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
                No blog posts found. Check back soon!
            </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;