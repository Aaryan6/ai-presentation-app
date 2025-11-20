'use client';

import Link from 'next/link';
import { Sparkles, Zap, Palette, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Presenter
            </span>
          </div>
          <Link
            href="/create"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Create Stunning Presentations in Minutes with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            From idea to polished slides in 3 simple steps
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/create"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
            >
              Create Your Presentation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-3xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white">
              <div className="text-center p-8">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600 text-lg">
                  AI-powered presentation generation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose AI Presenter?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Lightning Fast</h3>
            <p className="text-gray-600">
              Generate complete presentations in under a minute. Save hours of work with AI-powered content creation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Palette className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Professionally Designed</h3>
            <p className="text-gray-600">
              Choose from beautiful templates and color schemes. Every slide is designed to impress.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Powered Content</h3>
            <p className="text-gray-600">
              Smart content generation tailored to your topic, audience, and presentation purpose.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-white/50 rounded-3xl my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Enter Your Topic</h3>
            <p className="text-gray-600">
              Tell us what your presentation is about and who your audience is.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">AI Generates Slides</h3>
            <p className="text-gray-600">
              Our AI creates professional slides with content, structure, and speaker notes.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Customize & Download</h3>
            <p className="text-gray-600">
              Edit slides, choose your template, and export as PDF or HTML.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Amazing Presentations?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who save time with AI-powered presentations.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-12">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 AI Presenter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
