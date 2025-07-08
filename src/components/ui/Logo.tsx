interface LogoProps {
  className?: string
  size?: number
}

export default function Logo({ className = "w-8 h-8", size = 32 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="33.8 33.8 232.9 233" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M227.9,33.8h-38.8v38.8h-77.7v-38.8h-38.8c-21.5,0-38.8,17.4-38.8,38.8v155.4c0,21.5,17.4,38.8,38.8,38.8h38.8v-77.7h-38.8v-77.7h38.8v38.8h77.7v-38.8h38.8v77.7h-38.8v77.7h38.8c21.5,0,38.8-17.4,38.8-38.8V72.7c0-21.5-17.4-38.8-38.8-38.8Z" 
        fill="currentColor"
      />
    </svg>
  )
}