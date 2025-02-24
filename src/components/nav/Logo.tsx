import { MessageSquare } from 'lucide-react'

interface LogoProps {
  title : string
}

const Logo:React.FC<LogoProps> = ({title}) => {
  return (
    <div className="text-center mb-8">
    <div className="flex flex-col items-center gap-2 group">
      <div
        className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
      group-hover:bg-primary/20 transition-colors"
      >
        <MessageSquare className="size-6 text-primary" />
      </div>
      <h1 className="text-2xl font-bold mt-2">{title}</h1>
        </div>
  </div>
  )
}

export default Logo