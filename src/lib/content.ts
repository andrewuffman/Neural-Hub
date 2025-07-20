// Shared content storage (in-memory for now, replace with database in production)
export interface ContentItem {
  id: string
  userId: string
  title: string
  type: 'chat' | 'image' | 'code' | 'text'
  source: string
  content?: string
  tags: string[]
  conversation?: Array<{ role: 'user' | 'assistant', message: string, timestamp: string }>
  imageUrl?: string
  codeLanguage?: string
  createdAt: string
  updatedAt: string
}

// Global content storage that persists across API calls
let contentItems: ContentItem[] = []

export const contentStorage = {
  // Add new content
  create: (content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newContent: ContentItem = {
      ...content,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    contentItems.push(newContent)
    return newContent
  },

  // Get content by user ID
  getByUserId: (userId: string) => {
    return contentItems.filter(item => item.userId === userId)
  },

  // Get content by ID
  getById: (id: string) => {
    return contentItems.find(item => item.id === id)
  },

  // Update content
  update: (id: string, updates: Partial<ContentItem>) => {
    const index = contentItems.findIndex(item => item.id === id)
    if (index !== -1) {
      contentItems[index] = {
        ...contentItems[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      return contentItems[index]
    }
    return null
  },

  // Delete content
  delete: (id: string) => {
    const index = contentItems.findIndex(item => item.id === id)
    if (index !== -1) {
      contentItems.splice(index, 1)
      return true
    }
    return false
  },

  // Get all content (for debugging)
  getAll: () => {
    return contentItems
  },

  // Add sample content for testing
  addSampleContent: () => {
    if (contentItems.length === 0) {
      console.log('Adding sample content for testing...')
      const sampleContent: ContentItem[] = [
        {
          id: '1',
          userId: '1',
          title: 'ChatGPT: Marketing Strategy for SaaS Startup',
          type: 'chat',
          source: 'ChatGPT',
          tags: ['marketing', 'strategy', 'saas', 'startup'],
          conversation: [
            {
              role: 'user',
              message: 'I need help creating a marketing strategy for my SaaS startup.',
              timestamp: '10:30 AM'
            },
            {
              role: 'assistant',
              message: 'Great! Let\'s create a comprehensive marketing strategy...',
              timestamp: '10:31 AM'
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          userId: '1',
          title: 'Python Data Analysis Script',
          type: 'code',
          source: 'Claude',
          tags: ['python', 'data', 'analysis'],
          content: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Load data\ndf = pd.read_csv("data.csv")',
          codeLanguage: 'python',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      contentItems.push(...sampleContent)
    }
  }
}

// Initialize with sample content
contentStorage.addSampleContent() 