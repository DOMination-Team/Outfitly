import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CategoriesTabErrorFallback from "../categories-tab-error-fallback";
import CategoriesTabLoadingFallback from "../categories-tab-loading-fallback";
import CategoriesTab from "../categories-tab/categoriesTab";

const WardrobeFilters = () => {
  return (
    <div className="space-y-6">
      <ErrorBoundary fallbackRender={CategoriesTabErrorFallback}>
        <Suspense fallback={<CategoriesTabLoadingFallback />}>
          <CategoriesTab />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default WardrobeFilters;
