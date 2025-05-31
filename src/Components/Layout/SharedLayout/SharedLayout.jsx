import s from "./SharedLayout.module.scss"
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

export default function SharedLayout({...props}) {
    const categories = ["All", "front", "back", "tools", "database" , "other"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const filteredCategories = categories.filter((p)=>selectedCategory === "All"
    ? true
    : p.category.includes(selectedCategory.toLowerCase())
    );
    return (
        <div className={s.SharedLayoutContainer}>
            <nav className={s.SharedLayoutNav}>
                <ul className={s.tabsContainer}>
                    {categories.map((cat) => (
                        <motion.li
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={s.tabs}
                        >
                            <motion.div
                                className={s.tabButton}
                                animate={{
                                    fontWeight: selectedCategory === cat? "bold" : "normal",
                                    color: selectedCategory=== cat? "#000" : "#aaaaaa",
                                }}
                            >
                                {cat}

                            </motion.div>
                        </motion.li>
                    ))}
                </ul>
            </nav>
            <main className={s.SharedLayoutMain}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={props ? props.title : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={s.content}
                    >

                    </motion.div>
                </AnimatePresence>
            </main>

        </div>
    )
}