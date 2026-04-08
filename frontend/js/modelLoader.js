import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader.js';

// Create a reusable model loader with Draco compression support
export class OptimizedModelLoader {
    constructor() {
        this.gltfLoader = new GLTFLoader();
        this.dracoLoader = new DRACOLoader();
        
        // Set decoder path for Draco compression
        this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        this.gltfLoader.setDRACOLoader(this.dracoLoader);
        
        // Cache for loaded models
        this.modelCache = new Map();
        this.loadingModels = new Map();
    }

    /**
     * Load a model with caching, compression, and progress tracking
     * @param {string} modelPath - Path to the glTF/glB file
     * @param {Function} onLoad - Callback when model loads
     * @param {Function} onProgress - Callback for progress updates
     * @param {Function} onError - Callback for errors
     */
    loadModel(modelPath, onLoad, onProgress = null, onError = null) {
        // Return cached model if available
        if (this.modelCache.has(modelPath)) {
            console.log(`📦 Loading model from cache: ${modelPath}`);
            onLoad(this.modelCache.get(modelPath));
            return;
        }

        // Return existing loading promise if already in progress
        if (this.loadingModels.has(modelPath)) {
            this.loadingModels.get(modelPath).then(onLoad).catch(onError);
            return;
        }

        // Create loading promise
        const loadPromise = new Promise((resolve, reject) => {
            this.gltfLoader.load(
                modelPath,
                (gltf) => {
                    // Clone the scene to avoid sharing geometry
                    const clonedScene = gltf.scene.clone(true);
                    const clonedGltf = { ...gltf, scene: clonedScene };
                    
                    // Cache the model
                    this.modelCache.set(modelPath, clonedGltf);
                    this.loadingModels.delete(modelPath);
                    
                    console.log(`✅ Model loaded: ${modelPath}`);
                    onLoad(clonedGltf);
                    resolve(clonedGltf);
                },
                (xhr) => {
                    const progress = (xhr.loaded / xhr.total * 100);
                    console.log(`📥 ${modelPath}: ${progress.toFixed(2)}% loaded`);
                    if (onProgress) onProgress(progress);
                },
                (error) => {
                    console.error(`❌ Error loading model ${modelPath}:`, error);
                    this.loadingModels.delete(modelPath);
                    if (onError) onError(error);
                    reject(error);
                }
            );
        });

        this.loadingModels.set(modelPath, loadPromise);
    }

    /**
     * Lazy load a model when element enters viewport
     * @param {string} modelPath - Path to the model
     * @param {HTMLElement} triggerElement - Element to observe
     * @param {Function} onLoad - Load callback
     */
    lazyLoadModel(modelPath, triggerElement, onLoad) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(`👁️ Model ${modelPath} is now visible, loading...`);
                    this.loadModel(modelPath, (gltf) => {
                        onLoad(gltf);
                        observer.unobserve(triggerElement);
                    });
                }
            });
        }, { threshold: 0.1 });

        observer.observe(triggerElement);
    }

    /**
     * Show loading spinner
     */
    static showLoadingSpinner(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const spinner = document.createElement('div');
        spinner.id = 'model-loader-spinner';
        spinner.innerHTML = `
            <div class="spinner-overlay">
                <div class="spinner"></div>
                <p>Loading 3D Model...</p>
            </div>
        `;
        container.appendChild(spinner);
    }

    /**
     * Hide loading spinner
     */
    static hideLoadingSpinner() {
        const spinner = document.getElementById('model-loader-spinner');
        if (spinner) spinner.remove();
    }

    /**
     * Clear model cache
     */
    clearCache() {
        this.modelCache.clear();
        console.log('Model cache cleared');
    }

    /**
     * Dispose of resources
     */
    dispose() {
        this.dracoLoader.dispose();
        this.clearCache();
    }
}

export default OptimizedModelLoader;
