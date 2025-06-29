class BuildCoordinator {
  constructor() {
    this.builds = new Map();
    this.watchers = new Map();
  }

  registerBuild(name) {
    if (!this.builds.has(name)) {
      let resolver;
      const promise = new Promise((resolve) => {
        resolver = resolve;
      });
      this.builds.set(name, promise);
      this.builds.set(name + "_resolve", resolver);
    }
  }

  completeBuild(name) {
    const resolver = this.builds.get(name + "_resolve");
    if (resolver) {
      resolver();
      console.log(`✓ Build '${name}' completed`);
    }
  }

  async waitForBuild(name) {
    const promise = this.builds.get(name);
    if (promise) {
      console.log(`⏳ Waiting for build '${name}' to complete...`);
      await promise;
      console.log(`✓ Build '${name}' ready, proceeding...`);
    }
  }

  reset() {
    this.builds.clear();
  }
}

export default BuildCoordinator;
