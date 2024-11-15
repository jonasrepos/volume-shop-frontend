import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';

interface Category {
    gender?: string;
    categoryRoute?: string;
    categoryName?: string;
}

const categories: Category[] = [
    {
        gender: "MEN",
        categoryRoute: "/men/jeans",
        categoryName: "Jeans"
    },
    {
        gender: "MEN",
        categoryRoute: "/men/shirts",
        categoryName: "Shirts"
    },
    {
        gender: "MEN",
        categoryRoute: "/men/shorts",
        categoryName: "Shorts"
    },
    {
        gender: "MEN",
        categoryRoute: "/men/shirts",
        categoryName: "Accessoires"
    },
    {
        gender: "MEN",
        categoryRoute: "/men/shorts",
        categoryName: "Beachwear"
    },
    {
        gender: "WOMEN",
        categoryRoute: "/women/headwear",
        categoryName: "Headwear"
    },
    {
        gender: "WOMEN",
        categoryRoute: "/women/shirts",
        categoryName: "Shirts"
    },
    {
        gender: "WOMEN",
        categoryRoute: "/women/knits",
        categoryName: "Knits"
    },
    {
        gender: "ACCESSOIRES",
        categoryRoute: "/accessoires/glasses",
        categoryName: "Glasses"
    },
    {
        gender: "ACCESSOIRES",
        categoryRoute: "/accessoires/jewelry",
        categoryName: "Jewelry"
    }
];

const Navbar = () => {
    const [hoveredText, setHoveredText] = useState<string | null>(null);
    const [isHoveringCategory, setIsHoveringCategory] = useState(false);

    const handleMouseEnter = (text: string) => {
        setHoveredText(text);
        setIsHoveringCategory(false);
    };

    const handleMouseLeave = () => {
        setIsHoveringCategory(true);
    };

    const handleCategoryMouseEnter = () => setIsHoveringCategory(true);
    const handleCategoryMouseLeave = () => {
        setIsHoveringCategory(false);
        setHoveredText(null);
    };

    const location = useLocation();
    const currentPath = location.pathname

    return (
        <div className={styles.headerContainer}>
            <div className={styles.navbarContainer}>
                <Link to="/" onMouseEnter={handleCategoryMouseLeave}>
                    <div id={styles.logoContainer}>
                        <img src="./volume.svg" alt="volume" id={styles.logo} />
                    </div>
                </Link>

                <div className={styles.navbarTextContainer}>
                    <Link
                        to="/men"
                        className={styles.navbarText}
                        onMouseEnter={() => handleMouseEnter('MEN')}
                        onMouseLeave={handleMouseLeave}
                    >
                        MEN
                    </Link>
                    <Link
                        to="/women"
                        className={styles.navbarText}
                        onMouseEnter={() => handleMouseEnter('WOMEN')}
                        onMouseLeave={handleMouseLeave}
                    >
                        WOMEN
                    </Link>
                    <Link
                        to="/accessoires"
                        className={styles.navbarText}
                        onMouseEnter={() => handleMouseEnter('ACCESSOIRES')}
                        onMouseLeave={handleMouseLeave}
                    >
                        ACCESSOIRES
                    </Link>
                </div>

                <div id={styles.navbarIconContainer} onMouseEnter={handleCategoryMouseLeave}>
                    <span id={styles.searchBox}>
                        <input type="text" id={styles.searchInput}/>
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

            {(hoveredText || isHoveringCategory) && (
                <div
                    className={styles.kategorieContainer}
                    onMouseEnter={handleCategoryMouseEnter}
                    onMouseLeave={handleCategoryMouseLeave}>
                    <span id={styles.categoryNameBox}>{currentPath.slice(1)}</span>

                    <div className={styles.kategoriesBox}>
                        {categories
                            .filter(category => category.gender === hoveredText)
                            .map((category, index) => (
                                <Link key={index} to={category.categoryRoute as string} className={styles.navbarText}>
                                    {category.categoryName}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
