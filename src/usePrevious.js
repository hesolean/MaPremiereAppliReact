/**
 * vient de la communauté pour récupérer l'état précédent d'un composant associé à la constante wasEditing
 * @param {*} value 
 * @returns 
 */
export default function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};