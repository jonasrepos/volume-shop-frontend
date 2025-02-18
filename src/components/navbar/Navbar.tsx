import { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const navData = [
    {   
        category: "Furniture",
        subCategories: ["New Arrivals", "Lounge Chairs", "Lounge Tables", "Sideboards"],
    },
    {
        category: "Decoration",
        subCategories: ["New Arrivals", "Mirrors", "Vases", "Candles", "Wall Decoration"],
    },
    {
        category: "Lamps",
        subCategories: ["New Arrivals", "Floor Lamps", "Table Lamps"],
    }
];

const Navbar = () => {
    const [category, setCategory] = useState<string | null>(null);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.navbarContainer}>
                <div id={styles.logoContainer}>
                    <Link to="/">
                        <img src="./volume.svg"
                            alt="voljon"
                            id={styles.logo}
                            onMouseEnter={() => setCategory(null)} />
                    </Link>
                </div>

                <div className={styles.navbarTextContainer}>
                    {navData.map((item) =>
                        <Link
                            key={item.category}
                            to={`${item.category.toLowerCase()}`}
                            className={styles.navbarText}
                            onMouseEnter={() => setCategory(item.category)}
                        >
                            {item.category.toUpperCase()}
                        </Link>
                    )}

                </div>

                <div id={styles.navbarIconContainer}
                    onMouseEnter={() => setCategory(null)}>
                    <span id={styles.searchBox}>
                        <input type="text" id={styles.searchInput} />
                        <img src="./searchIcon.svg" alt="search" className={styles.navbarIcon} />
                    </span>

                    <Link to="/cart" >
                        <img src="./cartIcon.svg" alt="cart" className={styles.navbarIcon} />
                    </Link>

                    <Link to="/profile" >
                        <img src="./userIcon.svg" alt="profile" className={styles.navbarIcon} />
                    </Link>
                </div>
            </div>

            {(category != null) && (
                <div
                    className={styles.kategorieContainer}
                    onMouseLeave={() => setCategory(null)}>
                    <span id={styles.categoryNameBox}></span>

                    <div className={styles.kategoriesBox}>
                        {navData
                            .find((item) => item.category === category)
                            ?.subCategories.map((subCategory, index) => (
                                <Link
                                    key={index}
                                    to={`/${category.toLowerCase()}/${subCategory.toLowerCase().replace(/ /g, "-")}`}
                                    className={styles.navbarText}
                                >
                                    {subCategory}
                                </Link>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
