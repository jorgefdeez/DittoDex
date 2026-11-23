import Image from "next/image"

const Logo = ({ size = 48 }: { size?: number }) => (
    <Image
        src="/ditto-logo.png"
        alt=""
        aria-hidden="true"
        width={size}
        height={Math.round(size * (360 / 408))}
        priority
    />
)

export default Logo
