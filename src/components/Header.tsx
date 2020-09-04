import * as React from "react";
import Button from "./commons/Button";

export interface IHeaderProps {
    title: string;
    buttonValue: string;
    buttonAction: () => void;
}

export default class Header extends React.Component<IHeaderProps> {
    public render() {
        const { title, buttonValue, buttonAction } = this.props;
        return (
            <div className="header">
                <div>{title}</div>
                <Button
                    width="148px"
                    height="36px"
                    value={buttonValue}
                    isPrimary={true}
                    action={buttonAction}
                />
            </div>
        );
    }
}
