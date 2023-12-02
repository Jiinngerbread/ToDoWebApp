import {FC} from 'react'
import AppButton from './AppButton';

interface NoteItemProps { 
    title: string;
    onEditClick?(): void;
    onDeleteClick?(): void;
    onViewClick?(): void;
    description?: string;
}

const NoteItem: FC<NoteItemProps> = ({title, onEditClick, onDeleteClick,onViewClick, description}) => {
    return (
        <div className="bg-white shadow-md rounded p-5">
            <p className="font-semibold text-gray-700 text-lg mb-4">
                {title}
            </p>
            {description && 
                <p className="text-gray-700 ml-2 py-2">{description}</p>
            }
            <div className="space-x-4">
                <AppButton buttonName={description ? "Hide": 'View'} buttonColor='normal' onClick={onViewClick}/>
                <AppButton buttonName={'Edit'} onClick={onEditClick} buttonColor='regular' />
                <AppButton buttonName={'Delete'} buttonColor='danger' onClick={onDeleteClick}/>
            </div>
        </div>
    )
}

export default NoteItem