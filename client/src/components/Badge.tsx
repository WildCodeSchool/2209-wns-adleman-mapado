import {MouseEventHandler} from "react";
import CloseIcon from '@mui/icons-material/Close';

type BadgeProps = {
    text: string,
    customClass?: string,
    categoryId?: number
    functionOnClick?: MouseEventHandler<HTMLButtonElement> | undefined,
};

export default function Badge({text, customClass, functionOnClick, categoryId}: BadgeProps) {
    return (
        <div className={`badgeStyle${customClass ? customClass : ""}`}>
            <span>
                {text}
            </span>
            <button className="poiButton" onClick={functionOnClick} data-category-id={categoryId}>
                <CloseIcon/>
            </button>
        </div>
    )
}