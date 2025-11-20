'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { PresentationInput, COLOR_SCHEMES } from '@/types/presentation';
import { usePresentationStore } from '@/lib/store';

export default function CreatePage() {
  const router = useRouter();
  const { setPresentation, setGenerating } = usePresentationStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PresentationInput>({
    topic: '',
    numberOfSlides: 7,
    purpose: 'general',
    tone: 'professional',
    targetAudience: '',
    additionalContext: '',
    template: 'modern',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setGenerating(true, 'Preparing your presentation...');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate presentation');
      }

      const presentation = await response.json();
      setPresentation(presentation);
      router.push('/editor');
    } catch (error) {
      console.error('Error generating presentation:', error);
      alert('Failed to generate presentation. Please try again.');
      setGenerating(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.topic.trim().length > 0;
    if (step === 2) return formData.targetAudience.trim().length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Presenter
            </span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full mx-1 transition-colors ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Topic & Purpose</span>
            <span>Customization</span>
            <span>Template</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Step 1: Topic & Purpose */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What&apos;s your presentation about?
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presentation Topic *
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., Digital Marketing Strategy for 2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presentation Purpose
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['pitch', 'training', 'report', 'general'] as const).map((purpose) => (
                    <button
                      key={purpose}
                      onClick={() => setFormData({ ...formData, purpose })}
                      className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                        formData.purpose === purpose
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {purpose}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['professional', 'casual', 'persuasive', 'educational'] as const).map(
                    (tone) => (
                      <button
                        key={tone}
                        onClick={() => setFormData({ ...formData, tone })}
                        className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                          formData.tone === tone
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {tone}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Customization */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Customize your presentation
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Slides: {formData.numberOfSlides}
                </label>
                <input
                  type="range"
                  min="5"
                  max="15"
                  value={formData.numberOfSlides}
                  onChange={(e) =>
                    setFormData({ ...formData, numberOfSlides: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 slides</span>
                  <span>15 slides</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience *
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAudience: e.target.value })
                  }
                  placeholder="e.g., Marketing executives and business owners"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Context (Optional)
                </label>
                <textarea
                  value={formData.additionalContext}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalContext: e.target.value })
                  }
                  placeholder="Any specific points you want to include or emphasize..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-900"
                />
              </div>
            </div>
          )}

          {/* Step 3: Template Selection */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Choose your template
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {(['modern', 'professional', 'minimal', 'creative'] as const).map(
                  (template) => (
                    <button
                      key={template}
                      onClick={() => setFormData({ ...formData, template })}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.template === template
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-500 capitalize">{template}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 capitalize">{template}</h3>
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              step === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Presentation
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
