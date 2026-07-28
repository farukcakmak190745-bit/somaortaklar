"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Edit, Plus, Star, Filter, Grid3x3 } from "lucide-react";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from "@/lib/db-local";
import type { Testimonial } from "@/types";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
    name: "",
    text: "",
    rating: 5,
    initial: ""
  });
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTestimonials = selectedRating
    ? testimonials.filter((t) => t.rating === selectedRating)
    : testimonials;

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getTestimonials();
      await Promise.resolve();
      setTestimonials(data);
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadTestimonials();
  }, []);

  const openAddDialog = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      text: "",
      rating: 5,
      initial: ""
    });
    setDialogOpen(true);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.text) {
      alert("Lütfen gerekli alanları doldurun");
      return;
    }

    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, formData);
      } else {
        await createTestimonial(formData);
      }
      setDialogOpen(false);
      loadTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bu referansı silmek istediğinizden emin misiniz?")) {
      try {
        await deleteTestimonial(id);
        loadTestimonials();
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referanslar</h1>
          <p className="text-gray-600 mt-1">Müşteri yorumlarını ve referanslarını yönetin</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-10 px-4 rounded-l-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-10 px-4 rounded-r-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <Button onClick={openAddDialog} className="h-12 px-6 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
            <Plus className="w-5 h-5 mr-2" />
            Yeni Referans Ekle
          </Button>
        </div>
      </div>

      {/* Rating Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filtrele:</span>
            <Button
              variant={selectedRating === null ? "default" : "outline"}
              onClick={() => setSelectedRating(null)}
              className="h-9 px-4"
            >
              Tümü ({testimonials.length})
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={selectedRating === rating ? "default" : "outline"}
                onClick={() => setSelectedRating(rating)}
                className="h-9 px-4"
              >
                {Array.from({ length: rating }, (_, i) => (
                  <Star key={`star-${rating}-${i}`} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-64 animate-pulse">
                <CardHeader className="space-y-4">
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </CardHeader>
              </Card>
            ))
          ) : filteredTestimonials.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {selectedRating
                  ? "Bu puanı olan referans bulunamadı"
                  : "Henüz referans eklenmemiş"}
              </p>
              <p className="text-sm text-gray-500 mt-2">Referans eklemek için &apos;Yeni Referans Ekle&apos; butonuna tıklayın</p>
            </div>
          ) : (
            filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-navy-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.initial}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(testimonial)}
                    className="h-8 px-3 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-700 leading-relaxed italic mb-4">
                  {'"'}{testimonial.text}{'"'}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(testimonial.id)}
                  className="h-8 w-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Sil
                </Button>
              </Card>
            ))
          )}
        </div>
      ) : (
        /* List View */
        <Card>
          <CardHeader>
            <CardTitle>Referans Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
                <p className="text-gray-600 mt-4">Yükleniyor...</p>
              </div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <p>Kayıt bulunamadı</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-14 h-14 bg-navy-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {testimonial.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-2 italic">
                          {'"'}{testimonial.text}{'"'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(testimonial)}
                        className="h-8 px-3"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(testimonial.id)}
                        className="h-8 px-3"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? "Referans Düzenle" : "Yeni Referans Ekle"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Örn: Ahmet Yılmaz"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yorum *
              </label>
              <Textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Müşteri yorumunu buraya yazın..."
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Puanlama
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className={`p-2 rounded-lg transition-colors ${
                      rating <= (formData.rating || 0)
                        ? "bg-gold text-navy-900"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                İptal
              </Button>
              <Button type="submit" className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white">
                {editingTestimonial ? "Güncelle" : "Kaydet"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}