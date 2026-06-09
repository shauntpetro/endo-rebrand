"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

const DefaultFallback = () => (
  <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-[#FDF6E9] to-cream-primary flex items-center justify-center rounded-xl">
    <div className="text-center px-6">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-gold-primary/30 to-plum-primary/20 blur-sm" />
      <p className="text-sm text-stone-400">3D visualization unavailable</p>
    </div>
  </div>
);

export default class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[CanvasErrorBoundary]", error, errorInfo);
    import("@sentry/nextjs")
      .then((Sentry) => {
        Sentry.captureException(error, {
          extra: { componentStack: errorInfo.componentStack },
        });
      })
      .catch(() => {});
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultFallback />;
    }
    return this.props.children;
  }
}
