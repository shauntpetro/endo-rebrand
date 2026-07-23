import FemLunaConceptComparison from "@/components/figures/FemLunaConceptComparison";
import styles from "./selective-thread.module.css";

export default function DiagnosticCompare() {
  return (
    <figure className={`${styles.comparisonFigure} overflow-hidden bg-surface`}>
      <FemLunaConceptComparison />
      <figcaption className="border-t border-line bg-plum px-6 py-6 text-sm text-muted-on-dark sm:px-8">
        Conceptual representation; FemLUNA™ is IND-enabling. Not clinical imaging or
        performance data.
      </figcaption>
    </figure>
  );
}
