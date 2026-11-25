/**
 * VentoPOS Entegrasyon Katmanı (Adapter Tasarımı)
 *
 * Bu dosya, ileride VentoPOS API bilgileri ve sunucu adaptörü
 * (Cloudflare / Node) devreye alındığında kullanılacak sözleşmeleri
 * (interface) ve genişletilebilir adaptör mimarisini tanımlar.
 *
 * Güvenlik Notu: VentoPOS API anahtarları hiçbir zaman istemci (tarayıcı)
 * koduna dahil edilmemelidir; tüm çağrılar sunucu taraflı endpoint'lerden
 * (/api/ventopos/*) yapılmalıdır.
 */

export type OrderStage =
  | 'talep_alindi'
  | 'adresten_alindi'
  | 'yikamada'
  | 'kurutmada'
  | 'kalite_kontrol'
  | 'dagitimda'
  | 'teslim_edildi';

export interface PickupOrderRequest {
  readonly customerName: string;
  readonly phone: string;
  readonly district: string;
  readonly address: string;
  readonly serviceSlugs: readonly string[];
  readonly estimatedQuantityNote?: string;
  readonly preferredDate?: string;
  readonly notes?: string;
}

export interface PickupOrderResult {
  readonly success: boolean;
  readonly trackingCode?: string;
  readonly externalOrderId?: string;
  readonly message: string;
}

export interface OrderTrackingStatus {
  readonly trackingCode: string;
  readonly stage: OrderStage;
  readonly stageLabel: string;
  readonly updatedAtIso: string;
  readonly estimatedDeliveryText?: string;
}

export interface OrderProvider {
  readonly name: string;
  createPickupOrder(payload: PickupOrderRequest): Promise<PickupOrderResult>;
  getOrderStatus(trackingCode: string): Promise<OrderTrackingStatus | null>;
}

/**
 * Varsayılan adaptör: VentoPOS henüz aktif değilken güvenli fallback davranışı.
 */
export class PendingVentoPosProvider implements OrderProvider {
  readonly name = 'pending-ventopos';

  async createPickupOrder(_payload: PickupOrderRequest): Promise<PickupOrderResult> {
    return {
      success: false,
      message:
        'Online VentoPOS sipariş bağlantısı henüz aktif edilmedi. Telefon veya WhatsApp üzerinden anında randevu oluşturabilirsiniz.',
    };
  }

  async getOrderStatus(_trackingCode: string): Promise<OrderTrackingStatus | null> {
    return null;
  }
}

/**
 * İleride gerçek VentoPOS API URL ve kimlik bilgileri tanımlandığında
 * ortam değişkenleri (VENTOPOS_API_URL, VENTOPOS_API_KEY) üzerinden
 * aktif edilecek canlı sağlayıcı şablonu.
 */
export function getOrderProvider(): OrderProvider {
  return new PendingVentoPosProvider();
}
