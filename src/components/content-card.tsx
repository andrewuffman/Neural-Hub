import { formatDateTime, truncateText } from '@/lib/utils'
import { Brain, MessageSquare, Image, Code, FileText, MoreHorizontal } from 'lucide-react'

interface ContentCardProps {
  id: string
  title: string
  description?: string
  content: string
  type: 'TEXT' | 'IMAGE' | 'CODE' | 'CONVERSATION' | 'DOCUMENT' | 'OTHER'
  source?: string
  createdAt: Date
  tags?: string[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onView?: (id: string) => void
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'TEXT':
      return <FileText className="w-4 h-4" />
    case 'IMAGE':
      return <Image className="w-4 h-4" />
    case 'CODE':
      return <Code className="w-4 h-4" />
    case 'CONVERSATION':
      return <MessageSquare className="w-4 h-4" />
    default:
      return <Brain className="w-4 h-4" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'TEXT':
      return 'bg-blue-100 text-blue-800'
    case 'IMAGE':
      return 'bg-green-100 text-green-800'
    case 'CODE':
      return 'bg-purple-100 text-purple-800'
    case 'CONVERSATION':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function ContentCard({
  id,
  title,
  description,
  content,
  type,
  source,
  createdAt,
  tags = [],
  onEdit,
  onDelete,
  onView
}: ContentCardProps) {
  return (
    <div className="content-card group hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
            {getTypeIcon(type)}
          </span>
          <span className="text-sm text-muted-foreground capitalize">
            {type.toLowerCase()}
          </span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}
        <div className="text-sm text-muted-foreground mb-3">
          {truncateText(content, 150)}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
        <span>{formatDateTime(createdAt)}</span>
        {source && (
          <span className="bg-muted px-2 py-1 rounded">
            {source}
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex gap-2">
        {onView && (
          <button
            onClick={() => onView(id)}
            className="btn-primary text-xs px-3 py-1"
          >
            View
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(id)}
            className="btn-secondary text-xs px-3 py-1"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
} 