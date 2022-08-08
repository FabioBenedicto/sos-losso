import { useContext } from 'react';
import { LockerContext } from '../contexts/LockerContext';

export default function useLocker() {
    const value = useContext(LockerContext);
    return value;
}
