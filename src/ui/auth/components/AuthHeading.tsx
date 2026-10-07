interface AuthHeadingProps {
  title: string
  subtitle: string
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div className="mb-[26px] flex animate-fi flex-col gap-[5px] [animation-delay:.2s]">
      <h1 className="m-0 font-serif text-[31px] leading-[1.1] font-normal tracking-[-.015em]">{title}</h1>
      <p className="text-[13.5px] text-tx3">{subtitle}</p>
    </div>
  )
}
