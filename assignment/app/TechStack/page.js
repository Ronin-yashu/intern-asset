const TechStackPage = () => {
  const techStack = [
    {
      category: "Frontend",
      technologies: [
        "Next.js 16.1.6 - React framework",
        "React 19.2.3 - UI library",
        "Tailwind CSS 4.0 - Styling",
        "Radix UI - Component library",
        "Lucide React - Icons"
      ]
    },
    {
      category: "AI & RAG",
      technologies: [
        "Google Gemini 2.5 Flash - LLM",
        "@google/generative-ai - Gemini SDK",
        "RAG Architecture - Context retrieval",
        "Custom FAQ Search - Keyword matching"
      ]
    },
    {
      category: "Forms",
      technologies: [
        "React Hook Form - Form management",
        "Zod - Validation",
        "React Hot Toast - Notifications"
      ]
    },
    {
      category: "Backend",
      technologies: [
        "Next.js API Routes - Backend endpoints",
        "Node.js - Server runtime"
      ]
    },
    {
      category: "Deployment",
      technologies: [
        "Netlify - Hosting platform",
        "@netlify/plugin-nextjs - Optimization"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Technology Stack
          </h1>
          <p className="text-lg text-gray-600">
            Technologies used in this Healthcare Support Platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {techStack.map((section, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-blue-600 mb-4">
                {section.category}
              </h2>
              <ul className="space-y-2">
                {section.technologies.map((tech, i) => (
                  <li key={i} className="text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            RAG Implementation
          </h2>
          <p className="mb-4">
            The chatbot uses Retrieval-Augmented Generation to provide accurate responses:
          </p>
          <ol className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>User asks a question</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>System searches healthcare FAQs</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>Relevant FAQs retrieved as context</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>Context + question sent to Gemini</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">5.</span>
              <span>AI generates accurate response</span>
            </li>
          </ol>
          <div className="bg-blue-700 rounded-lg p-4">
            <h3 className="font-bold mb-2">Benefits:</h3>
            <ul className="space-y-1 text-sm">
              <li>✓ Accurate healthcare information from FAQs</li>
              <li>✓ No AI hallucinations - grounded in real data</li>
              <li>✓ Context-aware responses</li>
              <li>✓ Fast with Gemini 2.5 Flash</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechStackPage
