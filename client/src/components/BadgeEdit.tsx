import {MouseEventHandler} from "react";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from "@mui/icons-material/Edit";

type BadgeProps = {
    contentA: string,
    contentB?: string | undefined | null,
    customClass?: string,
    categoryId?: number,
    functionOnClick?: MouseEventHandler<HTMLButtonElement> | undefined,
    functionOnClick2?: MouseEventHandler<HTMLButtonElement> | undefined,
};

export default function BadgeEdit({contentA, contentB, customClass, functionOnClick, functionOnClick2, categoryId}: BadgeProps) {
    return (
        <div className={`badgeEditStyle${customClass ? customClass : ""}`}>
            <span>
                {contentA}
            </span>
            <span className={`category`}>
                {contentB}
            </span>
            <div className="icons_wrapper">
                <button className="poiButton" onClick={functionOnClick} data-id={categoryId}>
                    <CloseIcon/>
                </button>
                <button className="poiButton" onClick={functionOnClick2} data-id={categoryId}>
                    <EditIcon/>
                </button>
            </div>
        </div>
    )
}