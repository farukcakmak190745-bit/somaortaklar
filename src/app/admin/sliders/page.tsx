"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Trash2,
  Edit,
  Plus,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Upload as UploadIcon
} from "lucide-react";
import {
  getSliders,
  createSlider,
  updateSlider,
  deleteSlider
} from "@/lib/db-local";
import type { Slider } from "@/types";
import { toast } from "sonner";

export default function SlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState<Omit<Slider, 'id'>>({
    title: "",
    description: "",
    imageUrl: "",
    order: 1,
    active: true
  });

  const loadSliders = async () => {
    setLoading(true);
    try {
      const data = getSliders();
      setSliders(data);
    } catch (error) {
      console.error("Error loading sliders:", error);
      toast.error("Sliderlar yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadSliders();
  }, []);

  const openAddDialog = () => {
    setEditingSlider(null);
    setImagePreview("");
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      order: sliders.length + 1,
      active: true
    });
    setDialogOpen(true);
  };

  const openEditDialog = (slider: Slider) => {
    setEditingSlider(slider);
    setImagePreview(slider.imageUrl || "");
    setFormData({
      title: slider.title,
      description: slider.description,
      imageUrl: slider.imageUrl,
      order: slider.order,
      active: slider.active
    });
    setDialogOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({
          ...formData,
          imageUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle image preview cleanup
    const finalFormData = {
      ...formData,
      imageUrl: formData.imageUrl || ""
    };

    if (!finalFormData.title || !finalFormData.imageUrl) {
      alert("Lütfen gerekli alanları doldurun");
      return;
    }

    try {
      if (editingSlider) {
        await updateSlider(editingSlider.id, finalFormData);
        toast.success("Slider güncellendi");
      } else {
        await createSlider(finalFormData);
        toast.success("Slider eklendi");
      }
      setDialogOpen(false);
      setImagePreview("");
    } catch (error) {
      console.error("Error saving slider:", error);
      toast.error("Slider kaydedilirken hata oluştu");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bu slider'ı silmek istediğinizden emin misiniz?")) {
      try {
        await deleteSlider(id);
        toast.success("Slider silindi");
        loadSliders();
      } catch (error) {
        console.error("Error deleting slider:", error);
        toast.error("Slider silinirken hata oluştu");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Slider Yönetimi</h1>
          <p className="text-gray-600 mt-1">Hero sayfası için kayan fotoğrafları yönetin</p>
        </div>
        <Button onClick={openAddDialog} className="h-12 px-6 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
          <Plus className="w-5 h-5 mr-2" />
          Yeni Slider Ekle
        </Button>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-64 animate-pulse">
              <CardHeader className="space-y-4">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </CardHeader>
            </Card>
          ))
        ) : sliders.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Henüz slider eklenmemiş
            </p>
            <p className="text-xs text-gray-500 mt-1">&apos;Yeni Slider Ekle&apos; butonuna tıklayarak ekleyin</p>
          </div>
        ) : (
          sliders.map((slider) => (
            <Card key={slider.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image Preview */}
              <div className="h-48 bg-gradient-to-br from-blue-900 to-navy-900 flex items-center justify-center relative group">
                {slider.imageUrl ? (
                  <img
                    src={slider.imageUrl}
                    alt={slider.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                )}
                {/* Active Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  {slider.active ? (
                    <>
                      <Eye className="w-3 h-3 mr-1" />
                      Aktif
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 mr-1" />
                      Pasif
                    </>
                  )}
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Başlık</label>
                    <h3 className="text-lg font-bold text-gray-900">{slider.title}</h3>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Sıra</label>
                    <p className="text-sm text-gray-700">#{slider.order}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Açıklama</label>
                    <p className="text-sm text-gray-600 line-clamp-2">{slider.description}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(slider)}
                    className="flex-1 h-9 hover:bg-navy-50 hover:text-navy-900 hover:border-navy-300 hover:shadow-md transition-all duration-200"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Düzenle
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(slider.id)}
                    className="h-9 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      {dialogOpen && (
        <Dialog open={true}>
          <DialogContent
            className="max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogHeader>
              <DialogTitle>{editingSlider ? "Slider Düzenle" : "Yeni Slider Ekle"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlık *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn: Profesyonel Çekici Ekibimiz"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Hizmet hakkında açıklama..."
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fotoğraf Yükle *
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Fotoğraf seç</span> veya sürükleyip bırakın
                        </p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP (Maks. 5MB)</p>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-3">
                      <label className="text-xs text-gray-500 uppercase font-semibold mb-2 block">Önizleme:</label>
                      <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Slider Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setFormData({ ...formData, imageUrl: "" });
                          }}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Custom URL Input (optional) */}
                  <div>
                    <label className="block text-xs text-gray-500 uppercase font-semibold mb-2">
                      veya URL girin (isteğe bağlı)
                    </label>
                    <Input
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-xxx.jpg"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sıra No *
                  </label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durum
                  </label>
                  <NativeSelect
                    value={formData.active ? "true" : "false"}
                    onChange={(e) => setFormData({ ...formData, active: e.target.value === "true" })}
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Pasif</option>
                  </NativeSelect>
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
                  {editingSlider ? "Güncelle" : "Kaydet"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
