import { Bounded } from "./Bounded"
import { ButtonLink } from "./ButtonLink"
import { Logo } from "./Logo"

export const Header = () => {
    return (
        <Bounded
        as="header"
        className="absolute header top-0 left-0 w-full h-32 flex items-center justify-between px-4 z-50">
            <div
            className="grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-y-4 md:grid-cols-3">
                <div
                className="col-start-1 row-start-1">
                    <Logo className="text-brand-purple h-14 sm:h-16 md:h-20"/>
                </div>
                <nav
                className="col-span-2 font-mono text-lg row-start-2 flex justify-center gap-4 md:col-span-1 md:col-start-2 md:row-start-1">
                    <ul className="flex gap-6 text-xl">
                        <li className="cursor-pointer">
                            Team
                        </li>
                        <li className="cursor-pointer">
                            Customizer
                        </li>
                        <li className="cursor-pointer">
                            About
                        </li>
                    </ul>
                </nav>
                <div
                className="col-start-2 row-start-1 flex justify-self-end gap-4 md:col-start-3">
                    <ButtonLink
                    href="/"
                    size="md"
                    icon="cart"
                    >
                        <span className="hidden sm:inline">Cart </span>(1)
                    </ButtonLink>
                </div>
            </div>
        </Bounded>
    )
}