import React, { useState, useEffect } from 'react';

const AIChatbotModal = () => {
  // Add CSS animation for smooth bottom-left opening
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUpFromBottom {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
        content: 'Hello! 👋 I\'m your AI कलामृत Assistant! I can help you explore our exhibitions, art fairs, artists, purchase artwork, and even scan your walls for perfect art placement! I\'m here to make your art journey amazing. How can I assist you today? ✨',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced quick questions with conversational options
  const quickQuestions = [
    "Hi there! 👋",
    "Good morning! ☀️",
    "Tell me about Starry Night",
    "Show me exhibitions",
    "What art fairs do you have?",
    "AI Wall Scanner",
    "How to buy paintings?",
    "Tell me about artists",
    "Tell me a joke! 😄",
    "How are you? 🤖",
    "What can you do? ✨",
    "Goodbye! 👋"
  ];

  // Comprehensive art knowledge base
  const artKnowledge = {
    // Famous Artworks
    "starry night": "Starry Night is a famous painting by Vincent van Gogh, painted in 1889. It depicts the view from his asylum room at Saint-Rémy-de-Provence, just before sunrise. The painting shows a swirling sky, a village, and a cypress tree in the foreground. The bold, swirling brushstrokes and vibrant colors create a sense of movement and emotion that's characteristic of Van Gogh's post-impressionist style. This masterpiece is currently housed at the Museum of Modern Art in New York.",
    "mona lisa": "The Mona Lisa is a portrait by Leonardo da Vinci, painted between 1503 and 1506. It's one of the most famous paintings in the world, known for the subject's enigmatic smile and the sfumato technique used by da Vinci. The painting showcases Leonardo's mastery of light and shadow, creating a mysterious, almost living quality that has fascinated viewers for centuries. It's displayed at the Louvre Museum in Paris.",
    "the scream": "The Scream is a series of paintings by Norwegian artist Edvard Munch, created between 1893 and 1910. It depicts a figure with an agonized expression against a landscape with a tumultuous orange sky. This iconic work represents the anxiety and existential dread of modern life, making it one of the most recognizable pieces of expressionist art. The painting has been stolen twice and is now housed at the National Gallery in Oslo.",
    "guernica": "Guernica is a large oil painting by Pablo Picasso, created in 1937. It depicts the suffering of people and animals caused by war and violence, specifically the bombing of Guernica during the Spanish Civil War. The monochromatic palette and distorted figures create a powerful anti-war statement. This masterpiece is displayed at the Reina Sofía Museum in Madrid.",
    "the persistence of memory": "The Persistence of Memory is a 1931 painting by Salvador Dalí. It features melting clocks draped over a barren landscape, symbolizing the relativity of time and space. This surrealist masterpiece challenges our perception of reality and time, making it one of the most iconic works of the 20th century. It's housed at the Museum of Modern Art in New York.",

    // Art Movements
    "impressionism": "Impressionism was an art movement that emerged in the 1870s and 1880s, primarily in Paris. Artists like Claude Monet, Pierre-Auguste Renoir, and Edgar Degas focused on capturing light and movement, often painting outdoors (en plein air). They used visible brushstrokes, open composition, and emphasis on light and its changing qualities. This movement revolutionized art by breaking away from traditional studio painting and academic rules. Key characteristics include bright colors, loose brushwork, and everyday subjects.",
    "renaissance": "The Renaissance was a period of European cultural, artistic, political, and scientific rebirth after the Middle Ages, spanning roughly from the 14th to the 17th century. It began in Italy and was characterized by a renewed interest in classical learning and values. Artists like Leonardo da Vinci, Michelangelo, and Raphael created works that emphasized humanism, perspective, and realistic representation. This period marked the transition from medieval to modern art.",
    "cubism": "Cubism was an early 20th-century avant-garde art movement pioneered by Pablo Picasso and Georges Braque. It revolutionized European painting and sculpture by breaking objects into geometric forms and showing multiple perspectives simultaneously. Cubist artists rejected traditional techniques of perspective and modeling, instead presenting subjects from multiple viewpoints in a single image. This movement influenced many other art forms and continues to inspire contemporary artists.",
    "surrealism": "Surrealism was a cultural movement that began in the early 1920s, featuring the element of surprise and unexpected juxtapositions. Artists like Salvador Dalí and René Magritte created dreamlike, fantastical imagery that explored the unconscious mind. Surrealist works often combine realistic elements in impossible or illogical situations, challenging our perception of reality and logic.",
    "abstract expressionism": "Abstract Expressionism was a post-World War II art movement in American painting, developed in New York in the 1940s. Artists like Jackson Pollock and Mark Rothko created large-scale, abstract works that expressed emotional intensity. This movement emphasized spontaneous, automatic, or subconscious creation, often using gestural brushstrokes and non-representational imagery.",

    // Art Techniques
    "oil painting": "Oil painting is a technique using pigments mixed with drying oils like linseed oil. It allows for rich colors, smooth blending, and long working time. Famous oil painters include Leonardo da Vinci, Rembrandt, and Vincent van Gogh. The medium offers great flexibility - you can paint in thin glazes or thick impasto, and it dries slowly allowing for detailed work and corrections. Oil paintings are known for their depth, luminosity, and longevity.",
    "watercolor": "Watercolor uses pigments suspended in water-soluble mediums. It's known for its transparency and luminosity. Artists like J.M.W. Turner and John Singer Sargent were masters of this medium. Watercolor requires quick, confident brushwork as it's difficult to correct once applied. It's perfect for capturing light and atmosphere in landscapes and portraits. The medium is portable and dries quickly, making it ideal for plein air painting.",
    "acrylic": "Acrylic paint is a fast-drying paint made of pigment suspended in acrylic polymer emulsion. It's versatile, water-soluble when wet, and becomes water-resistant when dry. Acrylics can be used in thin washes like watercolor or built up in thick layers like oil paint. They're popular among contemporary artists for their flexibility and quick drying time.",
    "tempera": "Tempera is a painting medium made by mixing colored pigments with a water-soluble binder medium, usually egg yolk. It was the primary medium for panel painting during the Middle Ages and Renaissance. Tempera dries quickly and creates a matte finish with excellent color retention. Famous tempera works include many religious paintings and portraits from the Renaissance period.",

    // Website Information
    "exhibitions": "Our gallery features several exciting exhibitions:\n\n🎨 **Current Exhibition**: 'Modern Perspectives' - Showcasing contemporary artists and their innovative approaches to traditional themes.\n\n🖼️ **Upcoming Exhibition**: 'Nature's Symphony' - A celebration of landscape and botanical photography opening next month.\n\n🌟 **Permanent Collection**: Our curated selection of fine art photography and paintings, including landscape, seascape, and impressionist works.\n\n📅 **Exhibition Schedule**: We rotate exhibitions every 2-3 months to keep our collection fresh and engaging. All exhibitions are free to attend and open to the public.",
    
    "art fairs": "We participate in and host several prestigious art fairs throughout the year:\n\n🎪 **Spring Art Fair** (March): Our largest event featuring over 100 artists and galleries\n\n🌞 **Summer Contemporary Fair** (July): Focus on modern and contemporary art\n\n🍂 **Autumn Photography Fair** (October): Specialized photography exhibition and sale\n\n❄️ **Winter Masters Fair** (December): Classic and traditional artwork showcase\n\n💫 **Art Fair Benefits**: Meet artists, attend workshops, exclusive previews, and special pricing for fair attendees. Our art fairs are perfect opportunities to discover new artists and add unique pieces to your collection.",
    
    "artists": "Our gallery represents a diverse group of talented artists:\n\n👨‍🎨 **Contemporary Masters**: Emerging and established contemporary artists pushing boundaries\n\n📸 **Photography Artists**: Specialists in landscape, seascape, and botanical photography\n\n🎨 **Traditional Painters**: Masters of oil, watercolor, and acrylic techniques\n\n🌟 **Featured Artists**:\n• Sarah Chen - Landscape photography specialist\n• Marcus Rodriguez - Impressionist painter\n• Elena Petrov - Botanical artist\n• David Kim - Seascape photographer\n\n💡 **Artist Programs**: We offer artist talks, workshops, and studio visits. Many of our artists are available for commissions and custom work.",
    
    "buy paintings": "Purchasing artwork from our gallery is simple and secure:\n\n🛒 **How to Buy**:\n• Browse our online collection or visit the gallery\n• Contact us for pricing and availability\n• Secure payment through our online system\n• Professional packaging and shipping worldwide\n\n💰 **Pricing**:\n• Photography: $150 - $300\n• Paintings: $200 - $500\n• Limited Editions: $100 - $250\n• Custom Commissions: Starting at $400\n\n🚚 **Services**:\n• Free consultation on art selection\n• Professional framing options\n• Installation services\n• Art investment advice\n• Layaway plans available\n\n💳 **Payment Options**: Credit cards, bank transfers, and installment plans available.",
    
    "ai wall scanner": "Our revolutionary AI Wall Scanner technology helps you find the perfect artwork for your space:\n\n🤖 **How It Works**:\n• Upload a photo of your wall\n• Our AI analyzes space, lighting, and décor\n• Get personalized artwork recommendations\n• See how pieces will look in your space\n\n✨ **Features**:\n• Room style analysis\n• Color scheme matching\n• Size and proportion recommendations\n• Lighting considerations\n• Décor coordination\n\n📱 **Access**: Available on our website and mobile app. Simply take a photo of your wall and let our AI find the perfect artwork match!",
    
    "prices": "Our artwork prices are designed to be accessible while maintaining quality:\n\n📸 **Photography**:\n• Standard prints: $150 - $250\n• Limited editions: $200 - $350\n• Large format: $300 - $500\n\n🎨 **Paintings**:\n• Acrylic on canvas: $200 - $400\n• Oil paintings: $300 - $600\n• Watercolor: $150 - $300\n\n🌟 **Special Offers**:\n• New collector discounts\n• Seasonal sales\n• Art fair special pricing\n• Student and educator discounts\n\n💳 **Payment Plans**:\n• 0% interest financing available\n• Layaway plans\n• Corporate art leasing\n• Art investment portfolios",
    
    "categories": "We offer diverse art categories to suit every taste and space:\n\n🌄 **Landscape Photography**:\n• Mountain vistas and forest scenes\n• Urban landscapes and city views\n• Seasonal nature photography\n\n🌊 **Seascape Photography**:\n• Ocean waves and coastal views\n• Sunset and sunrise captures\n• Marine wildlife photography\n\n🌸 **Botanical Photography**:\n• Flower close-ups and macro shots\n• Garden and plant studies\n• Seasonal botanical collections\n\n🎨 **Impressionist Paintings**:\n• Contemporary impressionist works\n• Colorful abstract pieces\n• Atmospheric landscape paintings\n\n⚫ **Black & White Photography**:\n• Classic monochrome landscapes\n• Architectural photography\n• Portrait studies\n\n🏛️ **Contemporary Art**:\n• Modern abstract works\n• Mixed media pieces\n• Digital art prints",
    
    "landscape": "Our landscape collection captures the beauty of nature:\n\n🏔️ **Mountain Landscapes**: Dramatic peaks, alpine meadows, and forest trails\n🌲 **Forest Scenes**: Dense woodlands, misty paths, and autumn foliage\n🏞️ **Countryside Views**: Rolling hills, farmlands, and rural vistas\n🌆 **Urban Landscapes**: City skylines, architectural photography, and street scenes\n\n💡 **Popular Pieces**:\n• 'A Foggy Forest A Forest Pathway' - Serene woodland photography\n• 'A Sunrise Over Mountains in Snowy Mountains' - Dramatic mountain vistas\n• 'Dream of A Forest Pathway' - Impressionist forest scenes\n\n🎨 **Styles Available**: Photography, impressionist paintings, and contemporary interpretations. Perfect for creating a peaceful, natural atmosphere in any room.",
    
    "seascape": "Our seascape collection brings the ocean's beauty to your walls:\n\n🌊 **Ocean Views**: Rolling waves, stormy seas, and calm waters\n🌅 **Coastal Scenes**: Beach views, rocky shores, and harbor scenes\n🌊 **Marine Photography**: Underwater scenes, marine life, and coral reefs\n🌊 **Wave Studies**: Dynamic wave patterns and ocean textures\n\n💡 **Featured Works**:\n• 'Echoes of A Sunset At The Pier' - Dramatic sunset photography\n• 'Storm Clouds Over The Ocean' - Powerful ocean scenes\n• 'Beach with Gentle Waves' - Peaceful coastal photography\n\n🎨 **Perfect For**: Living rooms, bedrooms, and offices where you want to create a calming, ocean-inspired atmosphere. Our seascapes range from dramatic storm scenes to peaceful beach views.",
    
    "botanical": "Our botanical collection celebrates nature's delicate beauty:\n\n🌸 **Flower Photography**:\n• Macro flower close-ups\n• Garden collections\n• Seasonal floral studies\n\n🌿 **Plant Studies**:\n• Leaf patterns and textures\n• Succulent and cactus photography\n• Tropical plant collections\n\n🌺 **Botanical Art**:\n• Watercolor flower paintings\n• Scientific illustration style\n• Contemporary botanical interpretations\n\n💡 **Popular Pieces**:\n• 'Wildflowers In A Meadow' - Colorful field photography\n• 'Butterfly On Flowers' - Nature photography\n• 'Autumn Foliage' - Seasonal botanical studies\n\n🎨 **Perfect For**: Kitchens, dining rooms, and any space where you want to bring nature's beauty indoors. Botanical art has been popular for centuries and continues to bring life and color to interior design."
  };

  const getAIResponse = async (userMessage) => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userMessageLower = userMessage.toLowerCase();
    let response = "";
    
    // 🎭 GREETINGS & CONVERSATIONAL RESPONSES
    if (userMessageLower.includes("hello") || userMessageLower.includes("hi") || userMessageLower.includes("hola") || userMessageLower.includes("hey")) {
      const greetings = [
        "Hello there! 👋 Welcome to our कलामृत. How can I assist you today?",
        "Hi! I'm excited to help you explore our amazing art collection! What interests you?",
        "Hey! Great to see you here. Ready to discover some beautiful artwork?",
        "Hello! I'm your AI कलामृत Assistant. What would you like to explore today?"
      ];
      response = greetings[Math.floor(Math.random() * greetings.length)];
    } else if (userMessageLower.includes("good morning") || userMessageLower.includes("morning")) {
      response = "Good morning! ☀️ What a beautiful day to explore art! How can I help you discover something amazing today?";
    } else if (userMessageLower.includes("good afternoon") || userMessageLower.includes("afternoon")) {
      response = "Good afternoon! 🌤️ Perfect time to explore our gallery. What would you like to learn about?";
    } else if (userMessageLower.includes("good evening") || userMessageLower.includes("evening")) {
      response = "Good evening! 🌙 Art is beautiful at any time of day. How can I assist you this evening?";
    } else if (userMessageLower.includes("good night") || userMessageLower.includes("night")) {
      response = "Good night! 🌙 Sweet dreams of beautiful artwork. Feel free to visit again tomorrow!";
    } else if (userMessageLower.includes("bye") || userMessageLower.includes("goodbye") || userMessageLower.includes("see you") || userMessageLower.includes("farewell")) {
      const farewells = [
        "Goodbye! 👋 Thank you for visiting our कलामृत. Come back soon!",
        "See you later! 🎨 It was a pleasure helping you explore art today.",
        "Farewell! ✨ Hope you discovered something inspiring. Visit us again!",
        "Bye! 🖼️ Have a wonderful day filled with art and beauty!"
      ];
      response = farewells[Math.floor(Math.random() * farewells.length)];
    } else if (userMessageLower.includes("thank") || userMessageLower.includes("thank you") || userMessageLower.includes("thanks")) {
      const thanks = [
        "You're very welcome! 😊 I'm here to help you discover amazing art.",
        "My pleasure! 🎨 Helping art lovers is what I do best.",
        "Anytime! ✨ I love sharing knowledge about beautiful artwork.",
        "You're welcome! 🖼️ Feel free to ask me anything about art!"
      ];
      response = thanks[Math.floor(Math.random() * thanks.length)];
    } else if (userMessageLower.includes("how are you") || userMessageLower.includes("how do you do")) {
      response = "I'm doing wonderfully! 🤖✨ I'm excited to help you explore art and share knowledge about our amazing gallery. How about you? What brings you here today?";
    } else if (userMessageLower.includes("what is your name") || userMessageLower.includes("who are you")) {
        response = "I'm your AI कलामृत Assistant! 🤖✨ I'm here to help you explore our amazing art collection, learn about art history, discover artists, and find the perfect artwork for your space. What would you like to explore today?";
    } else if (userMessageLower.includes("joke") || userMessageLower.includes("funny")) {
      const artJokes = [
        "Why did the कलामृत go broke? Because it had too many bad art-ists! 😄🎨",
        "What do you call an artist who's always late? A procrasti-painter! 🕐🖼️",
        "Why did the painting go to therapy? Because it had too many hang-ups! 😂🖼️",
        "What's an artist's favorite drink? Paint-é! 🍷🎨"
      ];
      response = artJokes[Math.floor(Math.random() * artJokes.length)];
    } else if (userMessageLower.includes("love") || userMessageLower.includes("like") || userMessageLower.includes("favorite")) {
      if (userMessageLower.includes("art") || userMessageLower.includes("painting") || userMessageLower.includes("artist")) {
        response = "I absolutely love art! 🎨✨ Every piece tells a unique story and captures emotions in ways words cannot. I'm passionate about helping people discover the beauty and meaning behind artwork. What's your favorite type of art or artist?";
      } else {
        response = "I love helping people discover and appreciate art! 🎨✨ It's amazing how art can touch our souls and inspire creativity. What do you love about art?";
      }
    } else if (userMessageLower.includes("beautiful") || userMessageLower.includes("amazing") || userMessageLower.includes("wonderful")) {
      response = "Thank you! ✨ I think art is absolutely beautiful too. Every piece has its own unique beauty and story. What specific aspect of art do you find most beautiful?";
    } else if (userMessageLower.includes("starry night")) {
      response = artKnowledge["starry night"];
    } else if (userMessageLower.includes("mona lisa")) {
      response = artKnowledge["mona lisa"];
    } else if (userMessageLower.includes("the scream")) {
      response = artKnowledge["the scream"];
    } else if (userMessageLower.includes("guernica")) {
      response = artKnowledge["guernica"];
    } else if (userMessageLower.includes("persistence of memory")) {
      response = artKnowledge["the persistence of memory"];
    } else if (userMessageLower.includes("impressionism") || userMessageLower.includes("impressionist")) {
      response = artKnowledge["impressionism"];
    } else if (userMessageLower.includes("renaissance")) {
      response = artKnowledge["renaissance"];
    } else if (userMessageLower.includes("cubism") || userMessageLower.includes("cubist")) {
      response = artKnowledge["cubism"];
    } else if (userMessageLower.includes("surrealism") || userMessageLower.includes("surrealist")) {
      response = artKnowledge["surrealism"];
    } else if (userMessageLower.includes("abstract expressionism")) {
      response = artKnowledge["abstract expressionism"];
    } else if (userMessageLower.includes("oil painting") || userMessageLower.includes("oil")) {
      response = artKnowledge["oil painting"];
    } else if (userMessageLower.includes("watercolor")) {
      response = artKnowledge["watercolor"];
    } else if (userMessageLower.includes("acrylic")) {
      response = artKnowledge["acrylic"];
    } else if (userMessageLower.includes("tempera")) {
      response = artKnowledge["tempera"];
    } else if (userMessageLower.includes("exhibition") || userMessageLower.includes("exhibit")) {
      response = artKnowledge["exhibitions"];
    } else if (userMessageLower.includes("art fair") || userMessageLower.includes("fair")) {
      response = artKnowledge["art fairs"];
    } else if (userMessageLower.includes("artist") || userMessageLower.includes("painter") || userMessageLower.includes("photographer")) {
      response = artKnowledge["artists"];
    } else if (userMessageLower.includes("buy") || userMessageLower.includes("purchase") || userMessageLower.includes("order")) {
      response = artKnowledge["buy paintings"];
    } else if (userMessageLower.includes("ai wall scanner") || userMessageLower.includes("wall scanner") || userMessageLower.includes("scan")) {
      response = artKnowledge["ai wall scanner"];
    } else if (userMessageLower.includes("price") || userMessageLower.includes("cost") || userMessageLower.includes("expensive")) {
      response = artKnowledge["prices"];
    } else if (userMessageLower.includes("category") || userMessageLower.includes("type") || userMessageLower.includes("style")) {
      response = artKnowledge["categories"];
    } else if (userMessageLower.includes("landscape")) {
      response = artKnowledge["landscape"];
    } else if (userMessageLower.includes("seascape") || userMessageLower.includes("ocean") || userMessageLower.includes("sea")) {
      response = artKnowledge["seascape"];
    } else if (userMessageLower.includes("botanical") || userMessageLower.includes("flower") || userMessageLower.includes("plant")) {
      response = artKnowledge["botanical"];
    } else if (userMessageLower.includes("recommend") || userMessageLower.includes("suggest")) {
      response = "I'd be happy to recommend artwork! What style or category interests you? I can suggest pieces based on your preferences, budget, or the mood you want to create in your space. For example, I can recommend landscape photography for a peaceful atmosphere, impressionist paintings for artistic flair, or use our AI wall scanner to find the perfect match for your room.";
    } else if (userMessageLower.includes("website") || userMessageLower.includes("gallery") || userMessageLower.includes("collection")) {
        response = "Our कलामृत website offers a comprehensive art experience:\n\n🌐 **Website Features**:\n• Browse our complete art collection\n• View current and upcoming exhibitions\n• Learn about our artists\n• Use our AI wall scanner\n• Purchase artwork online\n• Book gallery visits and consultations\n\n🎨 **What We Offer**:\n• Fine art photography and paintings\n• Regular exhibitions and art fairs\n• Artist workshops and events\n• Professional art consultation\n• Worldwide shipping and installation\n\n💻 **Online Services**:\n• Virtual gallery tours\n• Online art consultation\n• Digital art previews\n• Secure online purchasing\n• Art investment guidance";
    } else if (userMessageLower.includes("help") || userMessageLower.includes("what can you do")) {
        response = "I'm your comprehensive कलामृत AI Assistant! 🎨✨ Here's what I can help you with:\n\n• Explore famous artworks and their stories\n• Learn about art movements and techniques\n• Discover our current and upcoming exhibitions\n• Find information about art fairs and events\n• Meet our featured artists\n• Get help with purchasing artwork\n• Use our AI Wall Scanner for perfect placement\n• Learn about pricing and categories\n• Get art recommendations\n\nWhat interests you most?";
    } else if (userMessageLower.includes("price") || userMessageLower.includes("cost") || userMessageLower.includes("expensive") || userMessageLower.includes("cheap")) {
      response = "Our artwork prices vary based on several factors:\n\n💰 **Pricing Factors:**\n• Artist reputation and experience\n• Artwork size and complexity\n• Medium and materials used\n• Uniqueness and rarity\n• Current market demand\n\n🎨 **Price Ranges:**\n• Prints: $50 - $500\n• Original paintings: $200 - $10,000+\n• Limited editions: $100 - $2,000\n• Sculptures: $500 - $15,000+\n\nWould you like me to help you find artwork within a specific budget range?";
    } else if (userMessageLower.includes("recommend") || userMessageLower.includes("suggestion")) {
      response = "I'd love to recommend some artwork! 🎨✨ To give you the best suggestions, could you tell me:\n\n• What's your budget range?\n• Do you prefer a specific style (abstract, realistic, modern, classic)?\n• What room or space are you decorating?\n• Any particular colors or themes you love?\n• Are you looking for paintings, prints, or sculptures?\n\nOnce I know your preferences, I can suggest perfect pieces for you!";
    } else if (userMessageLower.includes("size") || userMessageLower.includes("dimension")) {
      response = "Artwork sizes vary greatly! 📏 Here's a general guide:\n\n🖼️ **Common Sizes:**\n• Small: 8\" x 10\" to 16\" x 20\"\n• Medium: 18\" x 24\" to 24\" x 36\"\n• Large: 30\" x 40\" to 48\" x 60\"\n• Extra Large: 60\" x 80\" and beyond\n\n🎯 **Room Recommendations:**\n• Small rooms: 8\" x 10\" to 18\" x 24\"\n• Medium rooms: 24\" x 36\" to 36\" x 48\"\n• Large rooms: 48\" x 60\" and larger\n\nWould you like me to help you choose the perfect size for your space?";
    } else if (userMessageLower.includes("frame") || userMessageLower.includes("framing")) {
      response = "Framing is crucial for artwork presentation! 🖼️✨\n\n🎨 **Frame Options:**\n• Wood frames (classic, warm)\n• Metal frames (modern, sleek)\n• Ornate frames (traditional, elegant)\n• Minimalist frames (contemporary, clean)\n\n💡 **Framing Tips:**\n• Match frame style to artwork style\n• Consider room decor and color scheme\n• Use UV-protective glass for valuable pieces\n• Professional framing ensures longevity\n\nWould you like information about our framing services?";
    } else if (userMessageLower.includes("delivery") || userMessageLower.includes("shipping") || userMessageLower.includes("transport")) {
      response = "We offer comprehensive delivery and shipping services! 🚚✨\n\n📦 **Delivery Options:**\n• Local delivery (same day - 2 days)\n• National shipping (3-7 business days)\n• International shipping (7-14 business days)\n• White-glove delivery service\n\n🛡️ **Protection:**\n• Professional art packaging\n• Climate-controlled transport\n• Insurance coverage\n• Installation assistance\n\nWould you like a quote for delivery to your location?";
    } else if (userMessageLower.includes("visit") || userMessageLower.includes("come") || userMessageLower.includes("location")) {
      response = "We'd love for you to visit! 🏛️✨\n\n📍 **Location:** [Your Gallery Address]\n🕒 **Hours:** Tuesday-Sunday, 10 AM - 6 PM\n🎫 **Admission:** Free entry\n🚗 **Parking:** Available on-site\n\n📞 **Contact:** [Phone Number]\n📧 **Email:** [Email]\n🌐 **Website:** [Website]\n\nWould you like information about upcoming events or exhibitions?";
    } else if (userMessageLower.includes("contact") || userMessageLower.includes("phone") || userMessageLower.includes("email")) {
      response = "Here's how to reach us! 📞✨\n\n📞 **Phone:** [Your Phone Number]\n📧 **Email:** [Your Email]\n🌐 **Website:** [Your Website]\n📍 **Address:** [Your Gallery Address]\n\n💬 **Social Media:**\n• Instagram: [@YourGallery]\n• Facebook: [Your Gallery Page]\n• Twitter: [@YourGallery]\n\nHow can we help you today?";
    } else if (userMessageLower.includes("weather") || userMessageLower.includes("temperature")) {
      response = "I'm focused on art, not weather! 😄 But I can tell you that the atmosphere in our gallery is always perfect for appreciating beautiful artwork. What art-related topic would you like to explore?";
    } else {
      response = "That's an interesting question! While I don't have specific information about that topic, I can help you with:\n\n🎨 **Art Knowledge**: Famous artworks, movements, techniques\n🏛️ **Gallery Information**: Exhibitions, art fairs, artists\n🤖 **AI Services**: Wall scanner, recommendations\n💰 **Purchasing**: How to buy artwork, pricing, services\n\nWhat would you like to explore? You can also use the quick question buttons below for instant answers!";
    }
    
    setIsLoading(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    const botResponse = await getAIResponse(inputValue);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickQuestion = async (question) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const botResponse = await getAIResponse(question);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Beautiful floating button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 2000,
          background: 'linear-gradient(135deg, #d2691e 0%, #cd853f 100%)',
          color: '#f4e4bc',
          border: '2px solid #8b4513',
          borderRadius: '50%',
          width: '64px',
          height: '64px',
          fontSize: '24px',
          boxShadow: '0 6px 20px rgba(210, 105, 30, 0.4)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'linear-gradient(135deg, #cd853f 0%, #daa520 100%)';
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 8px 25px rgba(210, 105, 30, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(135deg, #d2691e 0%, #cd853f 100%)';
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 6px 20px rgba(210, 105, 30, 0.4)';
        }}
        aria-label="Open AI कलामृत Assistant"
      >
        🤖
      </button>

      {/* AI Chatbot Modal - Opens from bottom left */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2100,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            padding: '20px',
          }}
          onClick={() => setOpen(false)} // Close when clicking outside
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px 20px 0 0', // Rounded top corners only
              width: '90vw',
              maxWidth: '600px',
              height: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              marginLeft: '24px', // Align with the floating button
              marginBottom: '0', // Stick to bottom
              animation: 'slideUpFromBottom 0.3s ease-out',
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '2px solid #e9ecef',
                background: 'linear-gradient(135deg, #2c1810 0%, #3d2817 100%)',
                borderRadius: '20px 20px 0 0',
              }}
            >
              <div
                style={{
                  color: '#f4e4bc',
                  fontSize: '18px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: '"Georgia", serif',
                }}
              >
                🤖 AI कलामृत Assistant
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'linear-gradient(135deg, #d2691e 0%, #cd853f 100%)',
                  border: '2px solid #8b4513',
                  color: '#f4e4bc',
                  fontSize: '18px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #cd853f 0%, #daa520 100%)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #d2691e 0%, #cd853f 100%)';
                  e.target.style.transform = 'scale(1)';
                }}
                aria-label="Close Chatbot"
              >
                ×
              </button>
            </div>

            {/* Chat Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                background: '#f8f9fa',
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      background: message.type === 'user' ? '#007bff' : '#2c1810',
                      color: message.type === 'user' ? 'white' : '#f4e4bc',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      wordWrap: 'break-word',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '18px',
                      background: '#2c1810',
                      color: '#f4e4bc',
                    }}
                  >
                    🤔 Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div
              style={{
                padding: '16px',
                background: '#2c1810',
                borderTop: '1px solid #8b4513',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: '#f4e4bc',
                  marginBottom: '12px',
                  textAlign: 'center',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Quick Questions
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                }}
              >
                {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      style={{
                        background: '#d2691e',
                        color: '#f4e4bc',
                        border: '1px solid #8b4513',
                        borderRadius: '12px',
                        padding: '8px 10px',
                        fontSize: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                        fontWeight: '500',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#cd853f';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#d2691e';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      {question}
                    </button>
                  ))}

              </div>
            </div>

            {/* Input Area */}
            <div
              style={{
                padding: '16px',
                borderTop: '1px solid #e9ecef',
                background: 'white',
                borderRadius: '0 0 20px 20px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about art, exhibitions, or our gallery..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '2px solid #e9ecef',
                    borderRadius: '25px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d2691e';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  style={{
                    background: 'linear-gradient(135deg, #d2691e 0%, #cd853f 100%)',
                    color: '#f4e4bc',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    opacity: !inputValue.trim() || isLoading ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (inputValue.trim() && !isLoading) {
                      e.target.style.background = 'linear-gradient(135deg, #cd853f 0%, #daa520 100%)';
                      e.target.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (inputValue.trim() && !isLoading) {
                      e.target.style.background = 'linear-gradient(135deg, #d2691e 0%, #cd853f 100%)';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbotModal;
