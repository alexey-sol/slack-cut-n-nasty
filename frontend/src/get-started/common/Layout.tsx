import React from "react";

export interface Props {
    children: React.ReactNode;
}

export const Layout = ({ children }: Props) => (
    <div>
        {children}
    </div>
);

Layout.defaultProps = {
    children: null,
} as Partial<Props>;
