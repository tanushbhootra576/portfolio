import { motion } from "framer-motion";
import "./CertificationItem.css";

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const CertificationItem = ({ title, platform, date, description, link }) => {
    return (
        <motion.div
            className="certification-item"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="certification-header">
                <h3 className="cert-title">{title}</h3>
                <span className="cert-date">{date}</span>
            </div>
            <p className="cert-platform">{platform}</p>
            <p className="cert-desc">{description}</p>
            {link && (
                <a
                    href={link}
                    className="cert-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Certificate →
                </a>
            )}
        </motion.div>
    );
};

export default CertificationItem;
