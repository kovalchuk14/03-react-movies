import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps { 
    onSubmit: (title:string) => void,
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    
    function handleSearchBar(formData:FormData) {
        const title = (formData.get("query") as string).trim();
        if (title === "") {
            toast.error("Please enter your search query.")
            return;
        } else {
            onSubmit(title);
        }
    }

    return (
        <header className={styles.header}>   
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} action={handleSearchBar}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
}